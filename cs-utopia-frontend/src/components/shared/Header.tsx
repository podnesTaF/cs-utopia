import { Box } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import {useContext} from "react";
import {CustomThemeContext} from "@/context/theme-context";
import CustomSwitch from "@/components/shared/CustomSwitch";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

interface HeaderProps {
  routes: { name: string; path: string; icon?: any }[];
}

const Header: React.FC<HeaderProps> = ({ routes }) => {
  const router = useRouter();
  const {theme, toggleTheme, mode} = useContext(CustomThemeContext);

  return (
    <Box role="presentation" sx={{ px: 3, py: 1, bgcolor: theme?.palette.primary.dark, m: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
        {routes.map((r, i) => (
          <Link
            key={i}
            className={`link ${i === routes.length - 1 && "link-last"}`}
            href={r.path}
          >
            {r.icon}
            {r.name}
          </Link>
        ))}
      </Breadcrumbs>
    <Box>
        <CustomSwitch checked={mode === 'dark'} label={`${mode} mode`} name={'mode-control'} onChange={toggleTheme} />
    </Box>
    </Box>
  );
};

export default Header;
