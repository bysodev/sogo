import { useSession } from "next-auth/react";
import useSWR from 'swr';

const IMAGE_PROVIDER = "https://api.dicebear.com/7.x/fun-emoji/jpg";

export const useAvatars = () => {
    const { data: session } = useSession();

    const { data: avatars, error: avatarsError } = useSWR(`avatars-${session?.user?.image}`, async (image) => {
        const avatars = [];
        for (let i = 1; i <= 18; i++) {
            let randomString;
            if (i === 1) {
                // validate if session user image begins with https or not
                if (image.startsWith('https')) {
                    avatars.push({
                        src: image,
                        label: image,
                        id: i
                    });
                } else {
                    randomString = image || Math.random().toString(36).substring(2, 15);
                }
            } else {
                randomString = Math.random().toString(36).substring(2, 15);
            }
            const avatarUrl = await fetch(`${IMAGE_PROVIDER}?seed=${randomString}&eyes=closed,closed2,cute,glasses,love,plain,shades,sleepClose,stars,wink,wink2&mouth=cute,faceMask,kissHeart,lilSmile,smileLol,smileTeeth,tongueOut,wideSmile`).then(res => res.url);
            const label = avatarUrl.split('jpg?seed=')[1];
            avatars.push({
                src: avatarUrl,
                label: label,
                id: i
            });
        }
        return avatars;
    }, { revalidateOnFocus: false });

    return { avatars: avatars || [], avatarsError }; // Ensure avatars is always an array
};

export const useAvatar = (imageName: string) => {
    const { data: avatar, error: avatarError, isLoading } = useSWR(imageName, async (imageName) => {
        let avatarUrl;
        if (imageName.startsWith('https')) {
            avatarUrl = imageName;
        } else {
            avatarUrl = await fetch(`${IMAGE_PROVIDER}?seed=${imageName}`).then(res => res.url);
        }
        return avatarUrl;
    }, { revalidateOnFocus: false });

    return { avatar, avatarError, isLoading: isLoading };
};