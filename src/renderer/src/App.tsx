import { useState } from 'react'
import { Content, DraggableTopBar, RootLayout, Sidebar, NavBarItem } from './components'
import { GeneralSettings } from './components/GeneralSettings'
import { useAppConfig } from './hooks/useAppConfig'
import { Commands } from './components/commands'
import { GearIcon, AspectRatioIcon } from '@radix-ui/react-icons'

enum NavBarItemType {
  COMMANDS = 'Commands',
  GENERAL = 'General',

  // @TODO: work in progress
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
