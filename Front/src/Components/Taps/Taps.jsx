import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'

const Taps = ({
  title,
  title2 = 'title',
  title3 = 'title',
  description,
  description2
}) => {
  return (
    <Tabs variant="enclosed" size="md">
      <TabList>
        <Tab color="gray.900" fontWeight="bold">
          {title}
        </Tab>
        <Tab color="gray.900" fontWeight="bold">
          {title2}
        </Tab>
        <Tab color="gray.900" fontWeight="bold">
          {title3}
        </Tab>
      </TabList>

      <TabPanels transition="all" transitionDuration="1s">
        <TabPanel>
          <Text color="gray.700" fontWeight="light">
            {description}!
          </Text>
        </TabPanel>
        <TabPanel>
          <Text color="gray.700" fontWeight="light">
            {description2}
          </Text>
        </TabPanel>
        <TabPanel>
          <Text>three!</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Taps
