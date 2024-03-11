<template>


    <div class="card">
        <div id="cardTitle" class="card-header bg-success text-white">

            <slot name="cardH">
            </slot>
        </div> 
        
        <div class="card-body">
            <slot name="cardB"></slot>
        </div>

        <div class="card-foot">
            <slot name="cardF"></slot>
        </div>

    </div>


</template>


<script>
export default {
    name: 'cardView'
}
</script>


<style scoped>
    




</style>