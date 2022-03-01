import { bookService } from "../services/book-service.js"
import { eventBus } from "../services/eventBus-service.js";
import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js';
import searchList from "../cmps/search-list.cmp.js";

export default {
    template:`
        <section class="book-app">
        <book-filter @filtered="setFilter" class="filter-container"></book-filter>
        <search-list v-if="isSearching" :bookList="searchedBooks"></search-list>
        <book-list :books="booksToShow" ></book-list> 
        </section>
    
    `,
    components: {
        bookList,
        bookFilter,
        searchList
    },
    data() {
        return {
            isSearching: false,
            books: null,
            filterBy: null,
            selectedBook: null,
            searchList: null
        }
    },
    created() {
        bookService.query().then(books => this.books = books)
        this.unsubscribe = eventBus.on('searched', this.showList)
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        showList(searchList) {
            if(!searchList.length) this.isSearching = false;
            this.isSearching = true
            this.searchList = searchList
        }
    },
    computed: {
        booksToShow(){
            if(!this.filterBy) return this.books;
            const regex = new RegExp(this.filterBy.title, 'i');
            const min = this.filterBy.fromPrice || 0;
            const max = this.filterBy.toPrice || Infinity;
            return this.books.filter(book => (regex.test(book.title) && (min < book.listPrice.amount) && (max > book.listPrice.amount)));
        },
        searchedBooks() {
            return this.searchList
        }
    }
}