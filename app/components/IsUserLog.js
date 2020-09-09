import { useRouter } from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies';

export default function IsUserLog() {
    const router = useRouter()
    const cookies = parseCookies();

    if (!cookies.user_id) {
        return Router.push("/login");
    };
}