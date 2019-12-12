import AppHome from '@/components/pages/AppHome';
const AppAbout = () => import('@/components/pages/AppAbout');



const routes = [
    {
        path: '/',
        name: 'Home',
        component: AppHome
    },
    {
        path: '/about',
        name: 'About',
        component: AppAbout
    }
];

export default routes;
