import { isNode } from "@Utils";

export const ANIMATION_DURATION = 300;

//called when onclick top bar button
export const SIDEBAR_EL = () => {
  if (isNode()) {
    return null;
  } 
  return document.getElementById('sidebar');
} 

export const SUB_MENU_ELS = () => {
  if (isNode()) {
    return null;
  } 
  return document.querySelectorAll(
    '.menu > ul > .menu-item.sub-menu'
  );
} 

export const FIRST_SUB_MENUS_BTN = () => 
{
  if (isNode()) {
    return null;
  } 
  return document.querySelectorAll(
    '.menu > ul > .menu-item.sub-menu > a'
  );
}

export const INNER_SUB_MENUS_BTN = () =>
{
  if (isNode()) {
    return null;
  } 
  return document.querySelectorAll(
    '.menu > ul > .menu-item.sub-menu .menu-item.sub-menu > a'
  );
} 
