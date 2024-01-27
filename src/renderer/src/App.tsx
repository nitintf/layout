import { useState } from 'react'
import { Content, DraggableTopBar, RootLayout, Sidebar, NavBarItem } from './components'
import { GeneralSettings } from './components/GeneralSettings'
import { useAppConfig } from './hooks/useAppConfig'
import { Commands } from './components/commands'
import { GearIcon, DashboardIcon, AspectRatioIcon } from '@radix-ui/react-icons'

enum NavBarItemType {
  COMMANDS = 'Commands',
  GENERAL = 'General',
  APPS = 'Apps'
}

function App(): JSX.Element {
  const { config } = useAppConfig()
  const [active, setActive] = useState<NavBarItemType>(NavBarItemType.GENERAL)

  const handleNavBarItemClick = (item: NavBarItemType) => {
    setActive(item)
  }

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="relative">
          <NavBarItem
            title={NavBarItemType.GENERAL}
            active={active === NavBarItemType.GENERAL}
            icon={<GearIcon className="w-4 h-4" />}
            onClick={() => handleNavBarItemClick(NavBarItemType.GENERAL)}
          />
          <NavBarItem
            title={NavBarItemType.COMMANDS}
            active={active === NavBarItemType.COMMANDS}
            icon={<AspectRatioIcon className="w-4 h-4" />}
            onClick={() => handleNavBarItemClick(NavBarItemType.COMMANDS)}
          />
          <NavBarItem
            title={NavBarItemType.APPS}
            active={active === NavBarItemType.APPS}
            icon={<DashboardIcon className="w-4 h-4" />}
            onClick={() => handleNavBarItemClick(NavBarItemType.APPS)}
            className="px-6"
          />
          {/* <Button className="absolute bottom-4 left-4 w-[85%]" Icon={MdOutlineTipsAndUpdates}>
            Check for updates
          </Button> */}
        </Sidebar>
        <Content>
          {active === NavBarItemType.COMMANDS && <Commands commands={config?.commands} />}
          {active === NavBarItemType.GENERAL && <GeneralSettings config={config?.general} />}
          {active === NavBarItemType.APPS && <div>Apps</div>}
        </Content>
      </RootLayout>
    </>
  )
}

export default App
