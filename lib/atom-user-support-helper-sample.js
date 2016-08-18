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
    helper.getInteractiveConfigurationPanel().add('atom-user-support-helper-sample.key1', {
      type: 'input',
      name: 'Key 1',
      description: 'The sample of "input" type interface',
      default: 'key',
      validate: (result) => { return (result.length !== 0) ? true: 'too short' }
    })
    helper.getInteractiveConfigurationPanel().add('atom-user-support-helper-sample.key2', {
      type: 'checkbox',
      name: 'Key 2',
      description: 'The sample of "checkbox" type interface',
      default: ['key1', 'key2'],
      choices: ['key1', 'key2', 'key3'],
      map: (result) => { return result.join(','); }
    })

    // Add Random Tips
    const panel = helper.createRandomTipPanel('atom-user-support-helper-sample')
    panel.add('tip1', '<h1>Tip1</h1>')
    panel.add('tip2', '<h1>Tip2</h1>')
    panel.show();
  },
  openConfigurationPanel() {
    this.helper.getInteractiveConfigurationPanel().show(
      ['atom-user-support-helper-sample.key1', 'atom-user-support-helper-sample.key2']
    ).then((result) => { console.log(result) }, (err) => { console.log(err) })
  }
}
