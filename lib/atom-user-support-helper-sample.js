'use babel';

import {CompositeDisposable} from 'atom'

export default {
  activate(state) {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-user-support-helper-sample:open-config-panel': () => { this.openConfigurationPanel() }
    }))
  },
  deactivate() {
    this.subscriptions.dispose();
  },
  consumeUserSupportHelper(helper) {
    this.helper = helper;

    // Add configuration settings
    const config = helper.getInteractiveConfigurationPanel()
    config.add('atom-user-support-helper-sample.key1', {
      type: 'input',
      name: 'Key 1',
      message: 'The sample of "input" type interface',
      detail: 'The sample of detail',
      default: 'key',
      validate: (result) => { return (result.length !== 0) ? true: 'too short' }
    })
    config.add('atom-user-support-helper-sample.key2', {
      type: 'multipleList',
      name: 'Key 2',
      message: 'The sample of "multipleList" type interface',
      default: 'key1, key2',
      choices: ['key1', 'key2', 'key3'],
      map: (result) => { return result.join(','); },
      inverseMap: (result) => { return result.split(/,\s*/) }
    })
    config.add('atom-user-support-helper-sample.key3', {
      type: 'list',
      name: 'Key 3',
      message: 'The sample of "list" type interface',
      choices: ['key1', 'key2', 'key3']
    })
    config.add('atom-user-support-helper-sample.key4', {
      type: 'dropdown',
      name: 'Key 4',
      message: 'The sample of "dropdown" type interface',
      default: 'key1',
      choices: ['key1', 'key2', 'key3']
    })

    // Add Random Tips
    const panel = helper.createRandomTipPanel('atom-user-support-helper-sample')
    panel.add('tip1', '<h1>Tip1</h1>')
    panel.add('tip2', '<h1>Tip2</h1>')
    panel.show();
  },
  openConfigurationPanel() {
    this.helper.getInteractiveConfigurationPanel().show(
      ['atom-user-support-helper-sample.key1', 'atom-user-support-helper-sample.key2',
       'atom-user-support-helper-sample.key3', 'atom-user-support-helper-sample.key4']
    ).then((result) => { console.log(result) }, (err) => { console.log(err) })
  }
}
