import { bookService } from "../services/book-service.js";
import { eventBus } from "../services/eventBus-service.js";
export default {
    props: ['bookList'],
    template: `
        <section class="search-list">
            <div @click="addBook(idx)" v-for="(book, idx) in bookList">
                <h3>{{book.title}} <span>{{book.subtitle}}</span></h3>
            </div>
        </section>
    `,
    data() {
        return {
            books: null
        }
    },
    created() {
        this.books = this.bookList
    },
    methods: {
        addBook(idx) {
            var book = Object.assign({}, this.bookList[idx])
            bookService.addBookFromGoogle(book)
            eventBus.emit('show-msg', {txt: 'Book Added!', type: 'success'})
        }
    },
}