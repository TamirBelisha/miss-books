import { bookService } from "../services/book-service.js"
import reviewAdd from '../cmps/review-add.cmp.js'


export default {
    template: `
        <section v-if="book" class="book-details">
            <div class="details-container">
                <img :src="imgUrl" class="book-details-img">
                <h4>BOOK ID: <span>{{book.id}}</span></h4>
                <h2>Book details:</h2>
                <h4>Title: <span>{{book.title}}</span></h4>
                <h4>Subtitle: <span>{{book.subtitle}}</span></h4>
                <h4>Author: <span>{{authorsForDisplay}}</span></h4>
                <h4>Published at: <span>{{displayPublishedDate}}</span></h4>
                <h4>Categories: <span>{{displaycategories}}</span></h4>
                <h4>Page count: <span>{{displayPageCount}}</span></h4>
                <h4>Price: <span>{{formatCurrency}}</span></h4>
                <h4 v-if="book.listPrice.isOnSale">ON SALE !!</h4>
                <h4>Description: <span>{{showDescription}}</span> <span class="read-more" v-if="readMore" @click="showMore">Read {{moreLess}}</span></h4>
                <router-link :to="'/book'" class="card-btn btn href-unset center-txt">
                <button class="card-btn btn">Close</button>
                </router-link>
            </div>
            <review-add :bookId="book.id" class="review-form-container"/>
        </section>
    `,
    components: {
        reviewAdd
    },
    data() {
        return {
            book: null,
            isShowMore: false,
            description: null
        }
    },
    created() {
        let bookId = this.$route.params.bookId;
        bookService.get(bookId).then(book => {
            this.book = book
            this.description = book.description
        })
    },
    methods: {
        showMore() {
            this.isShowMore = !this.isShowMore
        }
    },
    computed: {
        showDescription() {
            if(!this.isShowMore && this.description.length > 100) return this.description.slice(0, 30)
            else return this.description
        },
        readMore() {
            return (this.description.length > 100)
        },
        moreLess() {
            return this.isShowMore ? 'less' : 'more'
        },
        authorsForDisplay() {
            return this.book.authors.join(', ')
        },
        displayPageCount() {
            let val = '';
            if (this.book.pageCount > 500) val = 'Long Reading'
            else if (this.book.pageCount > 200) val = 'Decent Reading'
            else val = 'Light Reading'

            return `${this.book.pageCount} pages, ${val}`
        },
        displayPublishedDate() {
            let date = new Date().getFullYear()
            let val = '';
            let calcYears = date - this.book.publishedDate;
            if (calcYears > 10) val = 'Veteran Book';
            if (calcYears < 1) val = 'New!';
            return `${this.book.publishedDate}, ${val}`
        },displaycategories() {
            return this.book.categories.join(', ')
        },
        imgUrl() {
            return this.book.thumbnail
        },
        displayPriceColor() {
            if (this.book.listPrice.amount > 150) return 'red'
            if (this.book.listPrice.amount < 20) return 'green'
        }, formatCurrency(){
            let val = this.book.listPrice.currencyCode;
            return new Intl.NumberFormat(val , { style: 'currency', currency: val }).format(this.book.listPrice.amount);
        },
    },
}