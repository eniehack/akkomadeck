<div class="panels-container" bind:this={panels}>
    <PanelsHeader />
    <slot />
    <PanelsFooter />
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
    import PanelsHeader from "./PanelsHeader.svelte";
    import PanelsFooter from "./PanelsFooter.svelte";
    import  Sortable from "sortablejs";
 import { onMount } from "svelte";

 let panels: HTMLElement;

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
