import {ReactComponent as ReactDiscordIcon} from "../assets/images/icons/discord.svg";
import {ReactComponent as ReactTwitterIcon} from "../assets/images/icons/twitter.svg";
import {ReactComponent as ReactOpenseaIcon} from "../assets/images/icons/opensea.svg";
import {ReactComponent as ReactTelegramIcon} from "../assets/images/icons/telegram-svgrepo-com.svg";
import {ReactComponent as ReactTwitterIcon2} from "../assets/images/icons/twitter-svgrepo-com.svg";

const SocialIcons = ({className}) => {
    return (
        <div className={className + " component-social-icons"}>
            <a href={'https://t.me/crogramapp'} target={'_blank'}>
                <ReactTelegramIcon style={{width: 35}}/>
            </a>
            <a href={'Https://Twitter.com/CroGramapp'} target={'_blank'}>
                <ReactTwitterIcon2 style={{width: 35}}/>
            </a>
        </div>
    );
};

export default SocialIcons;
