import { useState } from 'react'
import { Content, DraggableTopBar, RootLayout, Sidebar, NavBarItem, Commands } from './components'
import { PiCommandFill } from 'react-icons/pi'
import { RiSettings2Fill } from 'react-icons/ri'
import { GeneralSettings } from './components/GeneralSettings'

enum NavBarItemType {
  COMMANDS = 'Commands',
  GENERAL = 'General'
}

function App(): JSX.Element {
  const [active, setActive] = useState<NavBarItemType>(NavBarItemType.COMMANDS)

  const handleNavBarItemClick = (item: NavBarItemType) => {
    setActive(item)
  }

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar>
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
        </Sidebar>
        <Content>
          {active === NavBarItemType.COMMANDS && <Commands />}
          {active === NavBarItemType.GENERAL && <GeneralSettings />}
        </Content>
      </RootLayout>
    </>
  )
}

export default App
