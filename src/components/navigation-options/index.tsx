import ClayDropDown from "@clayui/drop-down";
import { signOut, useSession } from "next-auth/client";
import React, { useState } from "react";

import useLang from "@/hooks/useLang";

const NavigationOptions: React.FC = () => {
  const [active, setActive] = useState(false);
  const [session] = useSession();

  const { image, name } = session?.user || {};

  const i18n = useLang();

  const onLogout = async () => {
    setActive(false);
    await signOut({ callbackUrl: "http://localhost:3000/auth" });
  };

  if (image) {
    return (
      <ClayDropDown
        trigger={
          <img
            className="user-avatar"
            src={image}
            alt={i18n.sub("user-x-profile-image", name)}
          />
        }
        active={active}
        onActiveChange={setActive}
      >
        <ClayDropDown.Help>{i18n.sub("welcome-x", name)}</ClayDropDown.Help>
        <ClayDropDown.ItemList>
          <ClayDropDown.Item onClick={onLogout}>
            {i18n.get("logout")}
          </ClayDropDown.Item>
        </ClayDropDown.ItemList>
      </ClayDropDown>
    );
  } else {
    return <></>;
  }
};

export default NavigationOptions;
