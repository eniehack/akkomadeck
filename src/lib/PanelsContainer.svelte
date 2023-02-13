<div class="panels-container" bind:this={panels}>
    <slot />
</div>

<style>
 .panels-container {
     display: flex;
     overflow-x: scroll;
     overflow-y: hidden;
     flex-direction: row;
     gap: 15px;
 }
</style>

<script lang="ts">
 import { Sortable } from "sortablejs";
 import { onMount } from "svelte";

 let panels;
 onMount(async () => {
     Sortable.create(panels, {
         group: {
             name: "panels"
         },
         animation: 200,
         handle: ".dragicon",
     });
 });
</script>
