import { useState } from 'react'
import { Content, DraggableTopBar, RootLayout, Sidebar, NavBarItem } from './components'
import { PiCommandFill } from 'react-icons/pi'
import { RiSettings2Fill } from 'react-icons/ri'
import { GrAppsRounded } from 'react-icons/gr'
import { GeneralSettings } from './components/GeneralSettings'
import { useAppConfig } from './hooks/useAppConfig'
import { Commands } from './components/commands'

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
            icon={<RiSettings2Fill size={17} />}
            onClick={() => handleNavBarItemClick(NavBarItemType.GENERAL)}
          />
          <NavBarItem
            title={NavBarItemType.COMMANDS}
            active={active === NavBarItemType.COMMANDS}
            icon={<PiCommandFill size={17} />}
            onClick={() => handleNavBarItemClick(NavBarItemType.COMMANDS)}
          />
          <NavBarItem
            title={NavBarItemType.APPS}
            active={active === NavBarItemType.APPS}
            icon={<GrAppsRounded size={17} />}
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
