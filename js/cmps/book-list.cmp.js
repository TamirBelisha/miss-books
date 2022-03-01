import bookPreview from "./book-preview.cmp.js";

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <article v-for="book in books" class="book-preview-container">
                <book-preview :book="book"></book-preview>
                <router-link :to="'/book/'+book.id" class="card-btn btn href-unset">
                    <button class="card-btn btn">Preview</button>
                </router-link>
            </article>
        </section>
    `,
    components: {
        bookPreview
    }
}