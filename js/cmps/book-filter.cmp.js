import bookAdd from "./book-add.cmp.js";

export default {
    template: `
        <section>
            <div class="books-filter">
                <label for="txt-input">Book name: </label>
                <input type="text" name="txt-input" v-model="filterBy.title" placeholder="Search">
                <label for="min-price">From price: </label>
                <input type="number" name="min-price" v-model="filterBy.fromPrice">
                <label for="max-price">To price: </label>
                <input type="number" name="max-price" v-model="filterBy.toPrice">
                <button @click="setFilter" class="filter-btn btn">Filter</button>
            </div>
            <book-add class="book-add"></book-add>
        </section>
    `,
    components: {
        bookAdd
    },
     data() {
        return {
            filterBy: {
                title: '',
                price: 200,
                fromPrice: 0,
                toPrice: 0
            }
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.filterBy });
        }
    }
}