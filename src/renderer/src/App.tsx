import { useState } from 'react'
import { Content, DraggableTopBar, RootLayout, Sidebar, NavBarItem, Commands } from './components'
import { PiCommandFill } from 'react-icons/pi'
import { RiSettings2Fill } from 'react-icons/ri'
import { MdOutlineTipsAndUpdates } from 'react-icons/md'
import { GeneralSettings } from './components/GeneralSettings'
import Button from './components/ui/Button'
import { useAppConfig } from './hooks/useAppConfig'

enum NavBarItemType {
  COMMANDS = 'Commands',
  GENERAL = 'General'
}

function App(): JSX.Element {
  const { config } = useAppConfig()
  const [active, setActive] = useState<NavBarItemType>(NavBarItemType.COMMANDS)

  const handleNavBarItemClick = (item: NavBarItemType) => {
    setActive(item)
  }

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="relative">
          <NavBarItem
            title={NavBarItemType.COMMANDS}
            active={active === NavBarItemType.COMMANDS}
            icon={<PiCommandFill size={17} />}
            onClick={() => handleNavBarItemClick(NavBarItemType.COMMANDS)}
          />
          <NavBarItem
            title={NavBarItemType.GENERAL}
            active={active === NavBarItemType.GENERAL}
            icon={<RiSettings2Fill size={17} />}
            onClick={() => handleNavBarItemClick(NavBarItemType.GENERAL)}
          />
          <Button className="absolute bottom-4 left-4 w-[85%]" Icon={MdOutlineTipsAndUpdates}>
            Check for updates
          </Button>
        </Sidebar>
        <Content>
          {active === NavBarItemType.COMMANDS && <Commands commands={config?.commands} />}
          {active === NavBarItemType.GENERAL && <GeneralSettings config={config?.general} />}
        </Content>
      </RootLayout>
    </>
  )
}

export default App
