import { bookService } from "../services/book-service.js";
import { eventBus } from "../services/eventBus-service.js";
export default {
  template: `
        <section>
            <h2>Add a new book: </h2>
                <input @input="cleanList" type="text" placeholder="Search" class="book-add-input" v-model="searchVal">
            <button class="search-btn btn" @click="searchBook">Search</button>
        </section>
    `,
  data() {
    return {
      searchVal: '',
    };
  },
  methods: {
    searchBook() {
      bookService.getBooksFromGoogle(this.searchVal).then((items) => {
          var searchList = []
        for (var i = 0; i < items.length; i++) {
            searchList.push(items[i].volumeInfo)
        }
        eventBus.emit('searched', searchList)
      });
    },
    cleanList() {
      if(!this.searchVal.length) {
        eventBus.emit('searched', '')
      }
    }
  },
};
