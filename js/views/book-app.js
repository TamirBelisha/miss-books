import { bookService } from "../services/book-service.js"
import bookFilter from '../cmps/book-filter.js'
import bookList from '../cmps/book-list.cmp.js';
import bookDetails from './book-details.js';

export default {
    template:`
        <section class="book-app">
        <book-filter @filtered="setFilter" class="filter-container"></book-filter>
        <book-list :books="booksToShow" ></book-list> 
        </section>
    
    `,
    components: {
        bookList,
        bookDetails,
        bookFilter,
    },
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBook: null
        }
    },
    created() {
        bookService.query().then(books => this.books = books)
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        booksToShow(){
            if(!this.filterBy) return this.books;
            const regex = new RegExp(this.filterBy.title, 'i');
            const min = this.filterBy.fromPrice || 0;
            const max = this.filterBy.toPrice || Infinity;
            return this.books.filter(book => (regex.test(book.title) && (min < book.listPrice.amount) && (max > book.listPrice.amount)));
        }
    }
}