export default {
    props: ['book'],
    template: `
        <section class="book-preview-card">
            <img :src="imgUrl" class="card-img">
            <h3>Title: <span>{{book.title}}</span></h3>
            <h3>Price: <span>{{formatCurrency}}</span></h3>
        </section>
    `,
    computed: {
        imgUrl() {
            return this.book.thumbnail
        },
        formatCurrency() {
            let val = this.book.listPrice.currencyCode;
            return new Intl.NumberFormat(val, {style:'currency', currency: val}).format(this.book.listPrice.amount)
        }
    }
}