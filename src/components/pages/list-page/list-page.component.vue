<template>
  <div id="listPage">
        <div id="mapView">
        <div class="map-view-wrapper">
            <map-view
            v-if="addressList"
            v-bind:showList="true"
            v-bind:addressList="addressList">
            </map-view>
        </div>
    </div>
  </div>
</template>
<script src="./list-page.component.js"></script>
<style src="./list-page.component.css"></style>
