<template>
    <div id="formAddAddress">
        <el-dialog
            title="Add New Address"
            @close="handleClose"
            :visible.sync="showForm"
            width="70%">
            <span>
                <div class="form-body-wrapper">
                    <el-form :model="formData">
                        <el-form-item>
                            <gmap-autocomplete 
                                class="el-input__inner" 
                                placeholder="Enter Address"
                                :value="addressInput"
                                @place_changed="setPlace">
                            </gmap-autocomplete>
                        </el-form-item>
                        <div v-if="place">
                            <el-form-item :rules="rules.street" prop="street">
                                <el-input placeholder="Street" v-model="formDate.street" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item :rules="rules.city" prop="city">
                                <el-input placeholder="City" v-model="formDate.city" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item :rules="rules.province" prop="province">
                                <el-input placeholder="Province" v-model="formDate.province" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item :rules="rules.postalCode" prop="postalCode">
                                <el-input placeholder="Postal Code" v-model="formDate.street" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item :rules="rules.lat" prop="lat">
                                <el-input placeholder="Latitude" v-model="formDate.lat" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item :rules="rules.lng" prop="lng">
                                <el-input placeholder="Longitude" v-model="formDate.lng" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="submit-button" @click="submit">Submit</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script src="./form-add-address.component.js"></script>
<style src="./form-add-address.component.css" scoped></style>
