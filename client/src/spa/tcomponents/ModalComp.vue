<template>

    <!-- <div> -->

        <!-- {{ value }} -->
        <div class="modal fade" tabindex="-1" role="dialog">

            



            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">
                            <slot name="header">
                                title
                            </slot>
                        </h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
            
                    <div class="modal-body">
                        <slot name="body">
                            body
                        </slot>
                    </div>
            
                    <div class="modal-footer">
                        <slot name="footer">
                            footer
                        </slot>
                        <!-- <button @click="__closed">cl</button> -->
                        <!-- <button-save @click="save()"></button-save>
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i> Закрыть</button> -->
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div>

    <!-- </div> -->
</template>

<script>
export default {
    props: ["value"],

    mounted: function(){
        console.log(this.$el);
        $(this.$el).modal("show");
    },

    methods: {


        // __closed(){
        //     this.$emit("input", false);
        // }
    }
}
</script>

<style>

</style>
