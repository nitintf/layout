import { useState } from 'react'
import { Content, DraggableTopBar, RootLayout, Sidebar, NavBarItem } from './components'
import { useAppConfig } from './hooks/useAppConfig'
import { GearIcon, AspectRatioIcon } from '@radix-ui/react-icons'
import { WindowsManager, GeneralSettings } from './screens'

enum NavBarItemType {
  WINDOWS_MANAGER = 'Windows Manager',
  GENERAL = 'General',

  // @TODO: work in progress
  APPS_MANAGER = 'Apps Manager'
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
            title={NavBarItemType.WINDOWS_MANAGER}
            active={active === NavBarItemType.WINDOWS_MANAGER}
            icon={<AspectRatioIcon className="w-4 h-4" />}
            onClick={() => handleNavBarItemClick(NavBarItemType.WINDOWS_MANAGER)}
          />
        </Sidebar>
        <Content>
          {active === NavBarItemType.WINDOWS_MANAGER && (
            <WindowsManager windowsCommands={config?.windowsCommands} />
          )}
          {active === NavBarItemType.GENERAL && <GeneralSettings config={config?.general} />}
        </Content>
      </RootLayout>
    </>
  )
}

export default App
