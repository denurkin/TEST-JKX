import { types, flow } from "mobx-state-tree";
import axios from "axios";

const Item = types.model("Item", {
  id: types.string,
  number: types.number,
  type: types.string,
  date: types.string,
  automatic: types.union(types.boolean, types.null),
  values: types.number,
  description: types.string,
  address: types.string,
});

const ItemsStore = types
  .model("ItemStore", {
    items: types.array(Item),
    isLoading: types.boolean,
    pagination: 1,
    addressId: types.array(types.string), 
    addressValid: types.array(types.string),
  })
  .actions((self) => {
    const fetchItems = flow(function* fetchItems() {
      self.isLoading = true;
      try {
        const response = yield axios.get(
          "http://showroom.eis24.me/api/v4/test/meters/?limit=20&offset=" +
            self.pagination * 20
        );
        const itemsData = yield Promise.all(
          response.data.results.map((el: any, id: number) => {
            const addressReplace = self.addressId.find(
              (addressId) => addressId === el.area.id
            );
            if (addressReplace) {
              const addressReplaceId = self.addressId.indexOf(
                addressReplace
              );
              if (self.addressValid[addressReplaceId]) {
                return {
                  id: el.id,
                  number: id + 1,
                  type: el._type[0],
                  date: el.installation_date,
                  automatic: el.is_automatic,
                  values: el.initial_values[0],
                  description: el.description,
                  address: self.addressValid[addressReplaceId],
                };
              }              
            }

            self.addressId.push(el.area.id);
            return fetchItemWithAddress(el, id);
          })
        );

        
        self.items.replace(itemsData);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        self.isLoading = false;
      }
    });

    const fetchItemWithAddress = flow(function* (item, id) {
      try {
        const addressResponse = yield axios.get(
          "http://showroom.eis24.me/api/v4/test/areas/?id=" + item.area.id
        );
        const address =
          addressResponse.data.results[0].house.address +
          " " +
          addressResponse.data.results[0].str_number_full || "Unknown address";
        self.addressValid.push(address);
        return {
          id: item.id,
          number: id + 1,
          type: item._type[0],
          date: item.installation_date,
          automatic: item.is_automatic,
          values: item.initial_values[0],
          description: item.description,
          address: address,
        };
      } catch (error) {
        console.error(
          "Failed to fetch address for item " + item.id + ":",
          error
        );
        return {
          id: item.id,
          number: id + 1,
          type: item._type[0],
          date: item.installation_date,
          automatic: item.is_automatic,
          values: item.initial_values[0],
          description: item.description,
          address: "Unknown address",
        };
      }
    });

    const paginationIncrement = () => {
      self.pagination += 1;
      fetchItems();
    };

    const paginationDecrement = () => {
      self.pagination -= 1;
      fetchItems();
    };

    const removeItems = flow(function* (id: string) {
      try {
        yield axios.delete(
          "http://showroom.eis24.me/api/v4/test/meters/" + id + "/"
        );
      } catch (error) {
        console.error("Failed to delete item on server", error);
      } finally {
        store.fetchItems();
      }
    });

    return {
      fetchItems,
      paginationIncrement,
      paginationDecrement,
      removeItems,
    };
  });

const store = ItemsStore.create({
  items: [],
  isLoading: false,
  addressId: [], 
  addressValid: [],
});

export default store;