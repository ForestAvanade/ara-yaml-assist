// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

class AraYamlCompletionItemProvider implements vscode.CompletionItemProvider {
	provideCompletionItems(
	  document: vscode.TextDocument, 
	  position: vscode.Position
	): vscode.CompletionItem[] | Thenable<vscode.CompletionItem[]> {
	  const linePrefix = document.lineAt(position).text.substr(0, position.character);
	  const suggestions: vscode.CompletionItem[] = [];
  
	  // Example: Providing suggestions based on context
	  if (linePrefix.endsWith("format:")) {
		suggestions.push(new vscode.CompletionItem("filesystem", vscode.CompletionItemKind.Keyword));
		suggestions.push(new vscode.CompletionItem("jdbc_sqlserver", vscode.CompletionItemKind.Keyword));
		suggestions.push(new vscode.CompletionItem("jdbc_oracle", vscode.CompletionItemKind.Keyword));
		// ... add more suggestions as needed
	  }
	  // Add more context checks and suggestions as per your requirements
  
	  return suggestions;
	}
  }

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "ara-yaml-assist" is now active!');

    // Register the completion item provider for YAML files
    const provider = vscode.languages.registerCompletionItemProvider(
        'yaml', // Use 'yaml' if you're targeting all YAML files
        new AraYamlCompletionItemProvider(), 
        ' ' // Trigger on space
    );

    context.subscriptions.push(provider);
}


// This method is called when your extension is deactivated
export function deactivate() {}
