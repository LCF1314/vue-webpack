<template>
    <keep-alive>
        <router-view ></router-view>
    </keep-alive>
    <!-- <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div> -->
</template>
