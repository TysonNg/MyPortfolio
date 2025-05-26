import { Project } from '@/components/component/Projects.vue';
import { defineStore } from 'pinia';


export const useModalStore = defineStore('modal', {
    state: () => ({ open: false, selectedProject: {} as Project }),
    actions: {
        openModal() {
            this.open = true
        },
        closeModal() {
            this.open = false
        },
        setSelectedProject(project: Project){
            this.selectedProject = project
        }
    }
})