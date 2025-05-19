<template>
    <v-form class="mx-10 pa-10 w-100">
        <div class="d-flex ga-3">
            <v-text-field v-model="form.from_name" label="Name" required></v-text-field>
            <v-text-field v-model="form.email" label="Your Email" required></v-text-field>
        </div>
        <v-text-field v-model="form.subject" label="Subject" required></v-text-field>
        <v-textarea v-model="form.message" label="Message" required></v-textarea>
        <v-btn class="mt-2 w-100" @click="sendEmail" :loading="loading" :disabled="loading">
            <v-icon v-if="loading" size="20">mdi-loading</v-icon>
            <span v-else class="text-black">Submit</span>
        </v-btn>
    </v-form>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from 'emailjs-com'
const form = ref({
    from_name: '',
    subject: '',
    message: '',
    email: '',
})
const sendEmail = async () => {
    try {
        loading.value = true
        if (!form.value.from_name || !form.value.subject || !form.value.message || !form.value.email) {
            alert('Please fill in all fields')
            return
        }
        emailjs.send(
            'service_2ma1ilt',
            'template_q46ivc9',
            form.value,
            '2ElUSWtIbcnQqmjjM'
        )
        alert('Email sent successfully!')
    } catch (error) {
        alert('Error sending email: ' + error)
    } finally {
        loading.value = false
    }
}
const loading = ref(false)

</script>

<style lang="scss" scoped>

</style>