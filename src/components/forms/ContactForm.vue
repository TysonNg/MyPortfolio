<template>
    <v-form class="pa-6 pa-md-10 w-100 contact-form" @submit.prevent="sendEmail">
        <div class="name-email-row d-flex flex-column flex-sm-row ga-4">
            <v-text-field
                v-model="form.from_name"
                label="Your Name"
                placeholder="Enter your name"
                variant="outlined"
                density="comfortable"
                color="white"
                base-color="white"
                theme="dark"
                required
            ></v-text-field>
            <v-text-field
                v-model="form.email"
                label="Your Email"
                placeholder="Enter your email"
                variant="outlined"
                density="comfortable"
                color="white"
                base-color="white"
                theme="dark"
                type="email"
                required
            ></v-text-field>
        </div>
        <v-text-field
            v-model="form.subject"
            label="Subject"
            placeholder="Subject of your message"
            variant="outlined"
            density="comfortable"
            color="white"
            base-color="white"
            theme="dark"
            class="mt-2"
            required
        ></v-text-field>
        <v-textarea
            v-model="form.message"
            label="Your Message"
            placeholder="Write your message here..."
            variant="outlined"
            density="comfortable"
            color="white"
            base-color="white"
            theme="dark"
            rows="4"
            class="mt-2"
            required
        ></v-textarea>
        <v-btn
            class="mt-4 submit-btn w-100 font-weight-bold"
            rounded="sm"
            size="large"
            @click="sendEmail"
            :loading="loading"
            :disabled="loading"
        >
            <v-icon start size="18">mdi-send</v-icon>
            <span>Send Message</span>
        </v-btn>

        <!-- Notification Snackbar -->
        <v-snackbar
            v-model="snackbar.show"
            :color="snackbar.color"
            timeout="4000"
            location="bottom right"
        >
            {{ snackbar.text }}
            <template #actions>
                <v-btn variant="text" @click="snackbar.show = false">Close</v-btn>
            </template>
        </v-snackbar>
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

const loading = ref(false)

const snackbar = ref({
    show: false,
    text: '',
    color: 'success',
})

const showNotice = (text, color = 'success') => {
    snackbar.value = {
        show: true,
        text,
        color,
    }
}

const sendEmail = async () => {
    if (!form.value.from_name || !form.value.subject || !form.value.message || !form.value.email) {
        showNotice('Please fill in all required fields.', 'warning')
        return
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_2ma1ilt'
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_q46ivc9'
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '2ElUSWtIbcnQqmjjM'

    try {
        loading.value = true
        await emailjs.send(
            serviceId,
            templateId,
            form.value,
            publicKey
        )
        showNotice('Thank you! Your message has been sent successfully.', 'success')
        form.value = { from_name: '', subject: '', message: '', email: '' }
    } catch (error) {
        console.warn('EmailJS error:', error)
        showNotice('Failed to send email. Please reach out directly to nhatnguyenminh1507@gmail.com', 'error')
    } finally {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.contact-form {
    text-align: left;

    :deep(.v-field) {
        background-color: rgba(255, 255, 255, 0.05) !important;
        border-radius: 4px;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: rgba(255, 255, 255, 0.08) !important;
        }
    }

    :deep(.v-field__input) {
        color: #ffffff !important;
        font-size: 1rem;

        &::placeholder {
            color: rgba(255, 255, 255, 0.75) !important;
            opacity: 1 !important;
        }
    }

    :deep(.v-field-label),
    :deep(.v-label) {
        color: rgba(255, 255, 255, 0.9) !important;
        opacity: 1 !important;
        font-weight: 500;
    }

    :deep(.v-field__outline) {
        color: rgba(255, 255, 255, 0.35) !important;
        --v-field-border-opacity: 0.35 !important;
    }

    :deep(.v-field--focused .v-field__outline) {
        color: #ffffff !important;
        --v-field-border-opacity: 0.9 !important;
    }

    :deep(.v-field--focused .v-field-label),
    :deep(.v-field--focused .v-label) {
        color: #ffffff !important;
        opacity: 1 !important;
    }

    .submit-btn {
        background: #ffffff !important;
        color: #08090c !important;
        font-weight: 600 !important;
        letter-spacing: -0.01em;
        border: 1px solid rgba(255, 255, 255, 0.9) !important;
        border-radius: 4px !important;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

        &:hover {
            background: #e2e8f0 !important;
            box-shadow: 0 4px 16px rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
        }
    }
}
</style>