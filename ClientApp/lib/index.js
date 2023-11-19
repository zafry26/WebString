//import './styles/styles.scss';
import { slideToggle, slideUp, slideDown } from './slide';
import {
  ANIMATION_DURATION,
  FIRST_SUB_MENUS_BTN,
  INNER_SUB_MENUS_BTN,
  SIDEBAR_EL,
} from './constants';
import Poppers from './poppers';
import { isNode } from "@Utils";
import { select } from "@WebCastUtils";

//export const PoppersInstance = 

export const PoppersInstance = () => {
  if (isNode()) {
    return null;
  } 
  return new Poppers();
} 

/**
 * wait for the current animation to finish and update poppers position
 */
const updatePoppersTimeout = () => {
  setTimeout(() => {
    PoppersInstance().updatePoppers();
  }, ANIMATION_DURATION);
};

/**
 * sidebar collapse handler
 */
export function topBarCollapseHandler() {
  if(isNode())
  {
    return null;
  }

  let buttonCollapse = select('#btn-collapse');
 
  if(buttonCollapse)
  {
    document.getElementById('btn-collapse').addEventListener('click', () => {
      SIDEBAR_EL()?.classList.toggle('collapsed');
      PoppersInstance().closePoppers();
        if (SIDEBAR_EL()?.classList.contains('collapsed'))
          FIRST_SUB_MENUS_BTN()?.forEach((element) => {
            element.parentElement.classList.remove('open');
          });

      updatePoppersTimeout();
    });
  }

  /**
  * sidebar toggle handler (on break point )
  */
  let buttonToggle = select('#btn-toggle');
  if(buttonToggle)
  {
    document.getElementById('btn-toggle').addEventListener('click', () => {
      SIDEBAR_EL()?.classList.toggle('toggled');

      updatePoppersTimeout();
    });
  }

  /**
  * toggle sidebar on overlay click
  */
  let overlay = select('#overlay');
  if(overlay)
  {
    document.getElementById('overlay').addEventListener('click', () => {
      SIDEBAR_EL()?.classList.toggle('toggled');
    });
  }
}

export function sideBarHandler() {
  const defaultOpenMenus = document.querySelectorAll('.menu-item.sub-menu.open');

  defaultOpenMenus.forEach((element) => {
    element.lastElementChild.style.display = 'block';
  });

  /**
   * handle top level submenu click
   */
  FIRST_SUB_MENUS_BTN()?.forEach((element) => {
    element.addEventListener('click', () => {
      if (SIDEBAR_EL()?.classList.contains('collapsed'))
      {
        PoppersInstance().togglePopper(element.nextElementSibling);
      }
      else {
        /**
         * if menu has "open-current-only" class then only one submenu opens at a time
         */
        const parentMenu = element.closest('.menu.open-current-submenu');
        if (parentMenu)
          parentMenu
            .querySelectorAll(':scope > ul > .menu-item.sub-menu > a')
            .forEach(
              (el) =>
                window.getComputedStyle(el.nextElementSibling).display !==
                  'none' && slideUp(el.nextElementSibling)
            );
        slideToggle(element.nextElementSibling);
      }
    });
  });

  /**
   * handle inner submenu click
   */
  INNER_SUB_MENUS_BTN()?.forEach((element) => {
    element.addEventListener('click', () => {
      slideToggle(element.nextElementSibling);
    });
  });
}
