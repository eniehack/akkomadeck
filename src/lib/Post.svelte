<article>
    <aside>
        <img src={avatar} />
        <a rel="author" href="">test</a>
        <time>{time}</time>
    </aside>
    <div class="post-body">
        <slot />
    </div>
    <aside>
        <div class="reaction-bar">
            <span class="reply">
                reply
            </span>
            <span class="quote">
                quote
            </span>
            <span class="renote">
                renote
            </span>
            <span class="reaction">
                reaction
            </span>
            <span class="fav">
                fav
            </span>
        </div>
    </aside>
</article>

<style>
 article {
     margin: 10px 0;
     border: 1.5px solid;
 }

 .icon {
     width: 12px;
     height: 12px;
}
</style>

<script>
 export let avatar;
 export let time;
</script>
