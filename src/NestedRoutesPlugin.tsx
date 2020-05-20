import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import './GlobalStyles';

import reducers, { namespace } from './states';
import SettingsMenu from 'components/SettingsMenu/SettingsMenu';
import QueueSettingsPage from 'components/QueueSettingsPage/QueueSettingsPage';

const PLUGIN_NAME = 'NestedRoutesPlugin';

export default class NestedRoutesPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  init(flex: typeof Flex, manager: Flex.Manager) {
    this.registerReducers(manager);

    // Settings
    flex.SideNav.Content.add(
      <flex.SideLink
        showLabel
        icon={<Flex.Icon icon="Cogs" />}
        onClick={() => flex.Actions.invokeAction('HistoryPush', '/settings')}
        key="SettingsSideLink"
      >
        Settings
      </flex.SideLink>
    );

    flex.ViewCollection.Content.add(
      <flex.View name="settings" key="settings" route={{ path: '/settings' }}>
        <SettingsMenu />
      </flex.View>
    );

    // Nested
    flex.SideNav.Content.add(
      <flex.SideLink
        showLabel
        icon={<Flex.Icon icon="Bulb" />}
        onClick={() => flex.Actions.invokeAction('HistoryPush', '/settings/queues')}
        key="QueueSettingsSideLink"
      >
        Queue Settings
      </flex.SideLink>
    );

    flex.ViewCollection.Content.add(
      <flex.View name="queues" key="queues" route={{ path: '/settings/queues' }}>
        <QueueSettingsPage />
      </flex.View>
    );
  }

  private registerReducers(manager: Flex.Manager) {
    if (!manager.store.addReducer) {
      // tslint: disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${Flex.VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
