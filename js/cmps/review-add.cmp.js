import { bookService } from "../services/book-service.js"
import { eventBus } from "../services/eventBus-service.js";

export default {
    props: ['bookId'],
    template: `
        <section class="reviews-container">
            <form action="" class="review-form">
                <h3>Add review:</h3>
                <label>Your name: 
                    <input type="text" placeholder="Books Reader" v-model="review.writer">
                </label>
                <label>Rate: 
                    <span>
                    <span @click="review.rate = 1" class="fa fa-star c-p"></span>
                    <span @click="review.rate = 2" class="fa fa-star c-p"></span>
                    <span @click="review.rate = 3" class="fa fa-star c-p"></span>
                    <span @click="review.rate = 4" class="fa fa-star c-p"></span>
                    <span @click="review.rate = 5" class="fa fa-star c-p"></span>
                    </span>
                </label>
                <label>Date readed: 
                    <input type="date" v-model="review.readedAt">
                </label>
                <textarea name="" id="" cols="30" rows="10" placeholder="Type your review.." v-model="review.txt"></textarea>
                <input @click.prevent="submitReview" type="submit" class="card-btn btn">
            </form>
            <section v-if="book" style="margin-left: .5rem">
                <div v-for="review in showReviews" class="review">
                    <p>Review by: <span>{{review.writer}}</span></p>
                    <p>Rate: <span v-html="displayStars(review.rate)"></span></p>
                    <p>Date readed: <span>{{review.readedAt}}</span></p>
                    <p>Review: <span>{{review.txt}}</span></p>
                    <button @click="removeReview(review.id)" class="card-btn btn">Delete review</button>
                </div>
            </section>
        </section>
    `,
    data() {
        return {
            book:null,
            review: {
                writer: '',
                rate: 1,
                readedAt: '2022-02-22',
                txt: ''
            }
        }
    },
    created() {
        bookService.get(this.bookId).then(book => this.book = book)
    },
    methods: {
        submitReview() {
            if(!this.review.writer.length) this.review.writer = 'Books Reader'
            bookService.addReview(this.book.id, {...this.review}).then((book)=> {
                this.book = book;
                this.review = {
                    writer: '',
                    rate: 1,
                    readedAt: '2022-02-22',
                    txt: ''
                }
                eventBus.emit('show-msg', {txt: 'Review Added!', type: 'success'})
            })
        },
        displayStars(starCount) {
            return '<i class="fa fa-star"/>'.repeat(starCount)
        },
        removeReview(reviewId) {
            bookService.removeReview(this.book, reviewId)
            .then(book =>{
                this.book = book
                eventBus.emit('show-msg', {txt: 'Review was removed.', type:'success'})
            })
        }
    },
    computed: {
        showReviews() {
            if(Array.isArray(this.book.reviews)) return this.book.reviews
        },

    }
};
