<script setup lang="ts">
defineProps <
{
    content: string;
    size: string;
    url: string;
} > ()
</script>

<template>
    <router-link :to="url">
        <v-btn class="base-btn " :size="size">
            <p>{{content}}</p>
            <v-icon class="ml-1">mdi-arrow-right</v-icon>
        </v-btn>
    </router-link>
</template>

<style lang="scss" scoped>
.base-btn {
    color: white;
    font-weight: 600;
    background-color: #2556c0;
    border: solid 1px transparent;

    &:hover {
        background-color: black;
        border-color: white
    }
}
</style>