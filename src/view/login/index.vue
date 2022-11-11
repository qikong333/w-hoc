<template>
    <div class="bg">
        <div class="wapper">
            <div class="title text-28px mb-60px">Central Control System</div>
            <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 10 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-form-item
                    label="Username"
                    name="username"
                    :rules="[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]"
                >
                    <a-input v-model:value="formState.username" />
                </a-form-item>

                <a-form-item
                    label="Password"
                    name="password"
                    :rules="[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]"
                >
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>

                <a-form-item name="remember" :wrapper-col="{ span: 24 }">
                    <a-checkbox v-model:checked="formState.remember"
                        >Remember me</a-checkbox
                    >
                </a-form-item>

                <a-form-item :wrapper-col="{ span: 24 }">
                    <a-button type="primary" html-type="submit"
                        >Submit</a-button
                    >
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineComponent, reactive } from 'vue'

interface FormState {
    username: string
    password: string
    remember: boolean
}
const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
})
const onFinish = (values: any) => {
    console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
}
</script>
<style scoped lang="scss">
.bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background: url('src/assets/bg.jpg') 100%;
    background-size: cover;
}
.wapper {
    background-image: url('src/assets/texture.png');
    background-color: #fff;
    box-shadow: 2px 2px 2px 1px rgba(190, 190, 190, 0.2);
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 50%;
    margin: 15% auto;
    padding: 100px 0;
    text-align: center;
}
</style>
