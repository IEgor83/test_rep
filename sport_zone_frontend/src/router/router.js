import { createRouter, createWebHistory } from 'vue-router';

import MainView from '../views/MainView.vue'
import RegisterView from '../views/RegisterView.vue'
import AuthView from '../views/AuthView.vue'
import LogoutView from "@/views/LogoutView";
import ProfileView from "@/views/ProfileView";
import ProfileEditView from "@/views/ProfileEditView";
import ExercisesView from "@/views/ExercisesView";
import ExerciseDetailView from "@/views/ExerciseDetailView";
import TrainingsView from "@/views/TrainingsView";
import TrainingDetailView from "@/views/TrainingDetailView";


export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'main', component: MainView },
        { path: '/register', name: 'register', component: RegisterView },
        { path: '/auth', name: 'auth', component: AuthView },
        { path: '/logout', name: 'logout', component: LogoutView },
        { path: '/profile', name: 'profile', component: ProfileView },
        { path: '/profile/edit', name: 'profile_edit', component: ProfileEditView },
        { path: '/exercises', name: 'exercises', component: ExercisesView },
        { path: '/exercise/:id', name: 'exercise-detail', component: ExerciseDetailView },
        { path: '/trainings', name: 'trainings', component: TrainingsView },
        { path: '/training/:id', name: 'training-detail', component: TrainingDetailView },
    ]
})
