# Ara YAML Assistant

## Description

Avanade introduces ARA - a metadata-driven data platform accelerator based on Databricks. This tool empowers organizations to swiftly establish and expand Azure-centric data platforms. With ARA, navigating intricate data engineering tasks becomes intuitive, making data analytics aspirations a tangible reality.

Ara YAML Assistant is a Visual Studio Code extension designed to enhance the experience of working with YAML configuration files in the Ara data pipeline. It provides context-aware auto-completion, syntax validation, and other helpful features to streamline the development process.

## Features

- **Context-Aware Auto-Completion**: Intelligent suggestions based on the structure and context of your YAML files, including support for custom directives and properties.
- **Syntax Validation**: Checks your YAML files for errors and provides helpful feedback.

## Roadmap
- **Support for Multiple YAML Types**: Tailored assistance for different types of YAML files, such as data pipeline configurations and endpoint definitions. Current version only supports data pipeline configurations.
- **Easy Activation and Deactivation**: Quickly toggle the extension's functionality with a customizable hotkey.
- **Conditions Validation**: Validate conditions and keys in your YAML files to ensure they're properly used. E.g. `file_mask` can only be used when `format` is set to `csv`, `parquet`, or `json` etc..

## Usage

After installing the extension, open a YAML file in VS Code. The extension will automatically provide context-aware suggestions as you type.

To manually trigger suggestions, press `Ctrl + Space`. To insert a suggestion, press `Enter`.

## Installation

You can install Ara YAML Assistant from the Visual Studio Code Marketplace. Search for "Ara-yaml-assistant" and click "Install."

## Contributing

Contributions to Ara YAML Assistant are welcome. Please refer to our contribution guidelines for more information.

## License

This extension is licensed under the [MIT License](https://www.mit.edu/~amini/LICENSE.md).

## Support

If you encounter any issues or have suggestions for improvements, please contact [me](mailto:forest.jinying.deng@avanade.com).
