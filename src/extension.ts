import * as vscode from 'vscode';

class AraYamlCompletionItemProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(
        document: vscode.TextDocument, 
        position: vscode.Position
    ): vscode.CompletionItem[] | Thenable<vscode.CompletionItem[]> {
        const lineText = document.lineAt(position).text;
        const linePrefix = lineText.substr(0, position.character);
        const suggestions: vscode.CompletionItem[] = [];

        // Determine the indentation level to understand the context
        const indentLevel = this.getIndentLevel(lineText);
		const topLevelKey = this.getTopLevelKey(document, position.line);
        // Provide suggestions based on the indent level
         if (indentLevel === 0) {
            // First level suggestions
			if (linePrefix.trim() === "") 
			{
				let settingItem = new vscode.CompletionItem("settings:", vscode.CompletionItemKind.Keyword);
				settingItem.documentation = new vscode.MarkdownString("Ara data pipeline context settings");
				suggestions.push(settingItem);
				let sourceItem = new vscode.CompletionItem("source:", vscode.CompletionItemKind.Keyword);
				sourceItem.documentation = new vscode.MarkdownString("Ara data pipeline source configurations");
				suggestions.push(sourceItem);
				let transformationItem = new vscode.CompletionItem("transformation:", vscode.CompletionItemKind.Keyword);
				transformationItem.documentation = new vscode.MarkdownString("Ara data pipeline transformation configurations");
				suggestions.push(transformationItem);
				let destinationItem = new vscode.CompletionItem("destination:", vscode.CompletionItemKind.Keyword);
				destinationItem.documentation = new vscode.MarkdownString("Ara data pipeline destination configurations");
				suggestions.push(destinationItem);
				let jobdefItem = new vscode.CompletionItem("job_def:", vscode.CompletionItemKind.Keyword);
				jobdefItem.documentation = new vscode.MarkdownString("Ara data pipeline job definition");
				suggestions.push(jobdefItem);
			}
			if (topLevelKey === "transformation") {
				if (linePrefix.trim() === "") {
					let loadFromCsvItem = new vscode.CompletionItem("- !load_from_csv", vscode.CompletionItemKind.Snippet);
					loadFromCsvItem.documentation = new vscode.MarkdownString("Load data from a CSV file");
					suggestions.push(loadFromCsvItem);
					let loadFromJdbcItem = new vscode.CompletionItem("- ", vscode.CompletionItemKind.Snippet);
					loadFromJdbcItem.documentation = new vscode.MarkdownString("start a new list item for Ara data pipeline transformation");
					suggestions.push(loadFromJdbcItem);
					}
				else if (linePrefix.trim().endsWith("-")){
					suggestions.push(new vscode.CompletionItem("into:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("from:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("inColumn:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("inColumnOrder:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("inDataType:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("outColumn:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("outColumnOrder:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("outDataType:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("outColumnSelection:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("expr:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("expression:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("default:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("sqlQuery:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("sqlExpression:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("sqlExpr:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("description:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("union:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("unionDistinct:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("dataQualityCheck:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("runQA:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("lookup:", vscode.CompletionItemKind.Property));	
					suggestions.push(new vscode.CompletionItem("traits:", vscode.CompletionItemKind.Keyword));
					suggestions.push(new vscode.CompletionItem("wireframe:", vscode.CompletionItemKind.Keyword));			
				}
			}
		} else if (indentLevel === 1) {
            // Checking if we are inside the 'source' block
            if (topLevelKey === "source") {
                // Floating tip for source name definition
                const sourceNameItem = new vscode.CompletionItem("source name", vscode.CompletionItemKind.Property);
                sourceNameItem.documentation = new vscode.MarkdownString("Define your own source name here. The name must consist of a combination of alphabets, numbers, and underscores; dots are not permitted in DBR runtime version 12.2.");
                suggestions.push(sourceNameItem);
            }
			else if (topLevelKey === "transformation") {
				if (linePrefix.trim() === "" || linePrefix.trim().endsWith("-")) 
				{
					suggestions.push(new vscode.CompletionItem("into:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("from:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("inColumn:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("inColumnOrder:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("inDataType:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("outColumn:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("outColumnOrder:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("outDataType:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("outColumnSelection:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("expr:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("expression:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("default:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("sqlQuery:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("sqlExpression:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("sqlExpr:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("description:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("union:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("unionDistinct:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("dataQualityCheck:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("runQA:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("lookup:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("traits:", vscode.CompletionItemKind.Keyword));
					suggestions.push(new vscode.CompletionItem("wireframe:", vscode.CompletionItemKind.Keyword));
				}
			}
			else if (topLevelKey === "destination") {
                const sourceNameItem = new vscode.CompletionItem("destination name", vscode.CompletionItemKind.Property);
                sourceNameItem.documentation = new vscode.MarkdownString("Define your own destination name here. The name must consist of a combination of alphabets, numbers, and underscores; dots are not permitted in DBR runtime version 12.2.");
                suggestions.push(sourceNameItem);				
			}
			else if (topLevelKey === "settings") {
				if (linePrefix.trim() === "") 
				{
					let coreEngineItem = new vscode.CompletionItem("core_engine:", vscode.CompletionItemKind.Property);
					coreEngineItem.documentation = new vscode.MarkdownString("Define the core engine for your data pipeline. <br> The default value is 'spark', 'python' is only available for some streaming data sources.");
					suggestions.push(coreEngineItem);
					
					let dataQualityItem = new vscode.CompletionItem("data_quality_thresholds:", vscode.CompletionItemKind.Property);
					dataQualityItem.documentation = new vscode.MarkdownString("Define the data quality thresholds for your data pipeline.");
					suggestions.push(dataQualityItem);

					let transformationDataQualityItem = new vscode.CompletionItem("transformation_data_quality_mode:", vscode.CompletionItemKind.Property);
					transformationDataQualityItem.documentation = new vscode.MarkdownString("Define the data quality mode for your data pipeline. <br> The default value is `auto`. But other values like `explicit` and `implicit` are also the same with `auto`.");
					suggestions.push(transformationDataQualityItem);

					let pythonEngineItem = new vscode.CompletionItem("python_engine:", vscode.CompletionItemKind.Property);
					pythonEngineItem.documentation = new vscode.MarkdownString("Define the python engine parameters if you specify the core_engine as python.");
					suggestions.push(pythonEngineItem);

					let streamingItem = new vscode.CompletionItem("streaming:", vscode.CompletionItemKind.Property);
					streamingItem.documentation = new vscode.MarkdownString("Define the streaming parameters for your data pipeline if they're stream type.");
					suggestions.push(streamingItem);

					let schedulerItem = new vscode.CompletionItem("scheduler:", vscode.CompletionItemKind.Property);
					schedulerItem.documentation = new vscode.MarkdownString("Define the scheduler parameters for your data pipeline.");
					suggestions.push(schedulerItem);

					let checkpointStrategyItem = new vscode.CompletionItem("checkpoint_strategy:", vscode.CompletionItemKind.Property);
					checkpointStrategyItem.documentation = new vscode.MarkdownString("Define the checkpoint strategy for your data pipeline.");
					suggestions.push(checkpointStrategyItem);

					//let jobdefItem = new vscode.CompletionItem("job_def:", vscode.CompletionItemKind.Property);
					//jobdefItem.documentation = new vscode.MarkdownString("Define the job definition for your data pipeline including `namespace` and `name`.");
					//suggestions.push(jobdefItem);

					let dataQualityCheckItem = new vscode.CompletionItem("data_quality_check:", vscode.CompletionItemKind.Property);
					dataQualityCheckItem.documentation = new vscode.MarkdownString("Define the data quality check on data source level.");
					suggestions.push(dataQualityCheckItem);
				}
				if (linePrefix.trim().endsWith("core_engine:")) {
					// Suggestions for 'core_engine' values
					suggestions.push(new vscode.CompletionItem("spark", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("python", vscode.CompletionItemKind.Value));
				}
				if (linePrefix.trim().endsWith("transformation_data_quality_mode:")) {
					// Suggestions for 'transformation_data_quality_mode' values
					suggestions.push(new vscode.CompletionItem("auto", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("explicit", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("implicit", vscode.CompletionItemKind.Value));
				}
				if (linePrefix.trim().endsWith("checkpoint_strategy:")) {
					// Suggestions for 'checkpoint_strategy' values
					suggestions.push(new vscode.CompletionItem("delta_checkpoint", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("cache", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("local_checkpoint", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("disabled", vscode.CompletionItemKind.Value));
				}
			}
			else if (topLevelKey === "job_def") {
				if (linePrefix.trim() === "") 
				{
					let namespaceItem = new vscode.CompletionItem("namespace:", vscode.CompletionItemKind.Property);
					namespaceItem.documentation = new vscode.MarkdownString("Define the namespace for your data pipeline. <br> The default value is path of your data pipeline by replacing `/` to `.`.");
					suggestions.push(namespaceItem);
					let nameItem = new vscode.CompletionItem("name:", vscode.CompletionItemKind.Property);
					nameItem.documentation = new vscode.MarkdownString("Define the name for your data pipeline. <br> The default value is the name of your base data pipeline by replacing `/` to `.`.");
					suggestions.push(nameItem);
				}
			}
			if (linePrefix.trim().endsWith("inDataType:") || linePrefix.trim().endsWith("outDataType:")) {
				// Suggestions for 'inDataType' and 'outDataType' values
				suggestions.push(new vscode.CompletionItem("string", vscode.CompletionItemKind.Value));
				suggestions.push(new vscode.CompletionItem("smallint", vscode.CompletionItemKind.Value));
				suggestions.push(new vscode.CompletionItem("int", vscode.CompletionItemKind.Value));
				suggestions.push(new vscode.CompletionItem("bigint", vscode.CompletionItemKind.Value));
				suggestions.push(new vscode.CompletionItem("float", vscode.CompletionItemKind.Value));
				suggestions.push(new vscode.CompletionItem("double", vscode.CompletionItemKind.Value));
				suggestions.push(new vscode.CompletionItem("boolean", vscode.CompletionItemKind.Value));
				suggestions.push(new vscode.CompletionItem("binary", vscode.CompletionItemKind.Value));
				suggestions.push(new vscode.CompletionItem("date", vscode.CompletionItemKind.Value));
				suggestions.push(new vscode.CompletionItem("timestamp", vscode.CompletionItemKind.Value));
				suggestions.push(new vscode.CompletionItem("decimal", vscode.CompletionItemKind.Value));
			}
        } else if (indentLevel === 2) {
            // Checking if we are inside the 'source' name block
            if (topLevelKey === "source") {
                suggestions.push(new vscode.CompletionItem("batch_reader:", vscode.CompletionItemKind.Keyword));
                suggestions.push(new vscode.CompletionItem("stream_reader:", vscode.CompletionItemKind.Keyword));
            }
			else if (topLevelKey === "transformation") {
				const directive = this.getDirectiveAbove(document, position.line);
                switch (directive) {
                    case "load_from_csv":
                        suggestions.push(new vscode.CompletionItem("file:", vscode.CompletionItemKind.Property));
                        break;
                }

				if (this.getParentKeyAtLevel(document, position.line, 0) === "traits") {
					if (linePrefix.trim() === "")
					{
						suggestions.push(new vscode.CompletionItem("eventAction:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("eventOrder:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("inNotNull:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("nullifyEmpty:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("outNotNull:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("partition:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("pk:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("scopeKey:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("upperCase:", vscode.CompletionItemKind.Property));

					}
				}
				if (this.getParentKeyAtLevel(document, position.line, 0) === "- wireframe") 
				{
					if (linePrefix.trim() === "")
					{
						suggestions.push(new vscode.CompletionItem("rel_table_alias:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("rel_table_layer:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("rel_table_name:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("rel_column:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("rel_column_expression:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("rel_column_composition:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("rel_filter:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("scopemark_for_reprocess:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("dep_table_alias:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("dep_table_layer:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("dep_table_name:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("dep_column:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("dep_filter:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("name:", vscode.CompletionItemKind.Property));
					}
				}

			}
			else if (topLevelKey === "destination"){
				// if linePrefix.trim() is not empty or null, execute
				if (linePrefix.trim() === "") {
					suggestions.push(new vscode.CompletionItem("layer:", vscode.CompletionItemKind.Keyword));
					suggestions.push(new vscode.CompletionItem("format:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("name:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("write_mode:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("engine:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("from:", vscode.CompletionItemKind.Property));
					let primaryKeysItem = new vscode.CompletionItem("primary_keys:", vscode.CompletionItemKind.Property);
					primaryKeysItem.documentation = new vscode.MarkdownString("Define the primary keys for your data destination. <br> The type is `list` not `string`.");
					suggestions.push(primaryKeysItem);
					let scope_keyItem = new vscode.CompletionItem("scope_key:", vscode.CompletionItemKind.Property);
					scope_keyItem.documentation = new vscode.MarkdownString("Define the scope key for your data destination. <br> The type is `list` not `string`.");
					suggestions.push(scope_keyItem);
					suggestions.push(new vscode.CompletionItem("event_order:", vscode.CompletionItemKind.Property));
					let partitionColumnsItem = new vscode.CompletionItem("partition_columns:", vscode.CompletionItemKind.Property);
					partitionColumnsItem.documentation = new vscode.MarkdownString("Define the partition columns for your data destination. <br> The type is `list` not `string`.");
					suggestions.push(partitionColumnsItem);
					suggestions.push(new vscode.CompletionItem("event_action:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("pk_violations_handling_action:", vscode.CompletionItemKind.Property));
					let uppercasePkColumnsItem = new vscode.CompletionItem("uppercase_pk_columns:", vscode.CompletionItemKind.Property);
					uppercasePkColumnsItem.documentation = new vscode.MarkdownString("Define which the primary key columns are uppercased. <br> The type is `list` not `string`.");
					suggestions.push(uppercasePkColumnsItem);
					let schemaEvolutionRulesItem = new vscode.CompletionItem("schema_evolution_rules:", vscode.CompletionItemKind.Property);
					schemaEvolutionRulesItem.documentation = new vscode.MarkdownString("Define the schema evolution rules for your data destination. <br> The type is `list` not `string`.");
					suggestions.push(schemaEvolutionRulesItem);
					suggestions.push(new vscode.CompletionItem("increment_detection_mode:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("safe_schema_merge:", vscode.CompletionItemKind.Property));

					let streamingModeItem = new vscode.CompletionItem("streaming_mode:", vscode.CompletionItemKind.Property);
					streamingModeItem.documentation = new vscode.MarkdownString("Define the streaming mode for your data destination. <br> This is only valid for streaming data pipeline.");
					suggestions.push(streamingModeItem);

					let validFromItem = new vscode.CompletionItem("valid_from:", vscode.CompletionItemKind.Property);
					validFromItem.documentation = new vscode.MarkdownString("Define the valid from (start date/timestamp) column in scd.");
					suggestions.push(validFromItem);
					let validToItem = new vscode.CompletionItem("valid_to:", vscode.CompletionItemKind.Property);
					validToItem.documentation = new vscode.MarkdownString("Define the valid to (end date/timestamp) column in scd.");
					suggestions.push(validToItem);
					let validToOpenDateItem = new vscode.CompletionItem("valid_to_open_end_value:", vscode.CompletionItemKind.Property);
					validToOpenDateItem.documentation = new vscode.MarkdownString("Define the valid to open end value (e.g. `12-31-9999`) in scd.");
					suggestions.push(validToOpenDateItem);
					let validToOffsetItem = new vscode.CompletionItem("valid_to_offset:", vscode.CompletionItemKind.Property);
					validToOffsetItem.documentation = new vscode.MarkdownString("Define the valid to offset (e.g. `1 (1 day for date format, and 1 second for timestamp)`) in scd.");
					suggestions.push(validToOffsetItem);
					let scdCompWithTargetItem = new vscode.CompletionItem("scd_excluded_comparison_columns:", vscode.CompletionItemKind.Property);
					scdCompWithTargetItem.documentation = new vscode.MarkdownString("Define the excluded comparison columns between incoming dataframe and target delta table. <br> The type is `list` not `string`.");
					suggestions.push(scdCompWithTargetItem);
					let scdCompDedupeItem = new vscode.CompletionItem("scd_excluded_dedup_comparison_cols:", vscode.CompletionItemKind.Property);
					scdCompDedupeItem.documentation = new vscode.MarkdownString("Define the excluded comparison columns among the incoming dataframe. <br> The type is `list` not `string`.");
					suggestions.push(scdCompDedupeItem);

					let dedupByFileModTimeItem = new vscode.CompletionItem("dedup_by_file_mod_timestamp:", vscode.CompletionItemKind.Property);
					dedupByFileModTimeItem.documentation = new vscode.MarkdownString("Only valid for blob source to remove deplicated records from different files by their modified timestamp.");
					suggestions.push(dedupByFileModTimeItem);

					let destHandlingClassItem = new vscode.CompletionItem("handling_class:", vscode.CompletionItemKind.Property);
					destHandlingClassItem.documentation = new vscode.MarkdownString("Define the handling class for your data destination. You can define your custom destination handler here.");
					suggestions.push(destHandlingClassItem);
					
				}
				if (linePrefix.trim().endsWith("format:")) {
					// Suggestions for 'format' values
					suggestions.push(new vscode.CompletionItem("csv", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("json", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("parquet", vscode.CompletionItemKind.Value));
					let binaryBodyItem = new vscode.CompletionItem("binary_body", vscode.CompletionItemKind.Value);
					binaryBodyItem.documentation = new vscode.MarkdownString("This is only valid for File destination with `pandas` engine.");
					suggestions.push(binaryBodyItem);
					suggestions.push(new vscode.CompletionItem("delta", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("jdbc_sqlserver", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("jdbc_mysql", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("jdbc_oracle", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("jdbc_synapse", vscode.CompletionItemKind.Value));
				}
				if (linePrefix.trim().endsWith("layer:")) {
					// Suggestions for 'layer' values
					suggestions.push(new vscode.CompletionItem("raw", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("bronze", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("silver", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("gold", vscode.CompletionItemKind.Value));
                    suggestions.push(new vscode.CompletionItem("external", vscode.CompletionItemKind.Value));
				}
				if (linePrefix.trim().endsWith("write_mode:")) {
					// Suggestions for 'write_mode' values
					suggestions.push(new vscode.CompletionItem("overwrite", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("append", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("upsert", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("replace", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("scd_technical_events", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("scd_technical_events_dedupe", vscode.CompletionItemKind.Value));
				}
				if (linePrefix.trim().endsWith("pk_violations_handling_action:")){
					suggestions.push(new vscode.CompletionItem("pickone", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("reject", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("error", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("fail", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("throw", vscode.CompletionItemKind.Value));
				}
				if (linePrefix.trim().endsWith("uppercase_pk_columns:")){
					suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
				}
				if (linePrefix.trim().endsWith("schema_evolution_rules:")){
					suggestions.push(new vscode.CompletionItem("[allow_new_columns]", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("[allow_drop_columns] ", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("[ignore_missing_columns]", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("[allow_all_type_changes]", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("[allow_safe_type_changes]", vscode.CompletionItemKind.Value));
				}
				if (linePrefix.trim().endsWith("increment_detection_mode:")){
					suggestions.push(new vscode.CompletionItem("full_record", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("attribute_hash160", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("event_order_timestamp", vscode.CompletionItemKind.Value));
				}
				if (linePrefix.trim().endsWith("safe_schema_merge:")){
					suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
				}
				if (linePrefix.trim().endsWith("dedup_by_file_mod_timestamp:")){
					suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
				}
				if (linePrefix.trim().endsWith("engine:")){
					suggestions.push(new vscode.CompletionItem("spark", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("pandas", vscode.CompletionItemKind.Value));
				}
				if (linePrefix.trim().endsWith("streaming_mode:")){
					suggestions.push(new vscode.CompletionItem("microbatching", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("structured_streaming", vscode.CompletionItemKind.Value));
				}

			}
			else if (topLevelKey === "settings") {
				if (this.getParentKeyAtLevel(document, position.line, indentLevel - 1) === "data_quality_thresholds") {
					if (linePrefix.trim() === "")
					{
						let maxDefectPercItem = new vscode.CompletionItem("max_defect_perc:", vscode.CompletionItemKind.Property);
						maxDefectPercItem.documentation = new vscode.MarkdownString("Maximum percentage of defects allowed. <br> Default value is `100`");
						suggestions.push(maxDefectPercItem);
						let maxDefectCountItem = new vscode.CompletionItem("max_defect_row_count:", vscode.CompletionItemKind.Property);
						maxDefectCountItem.documentation = new vscode.MarkdownString("Maximum number of defects allowed. <br> Default value is `-1` (no limitation)");
						suggestions.push(maxDefectCountItem);
						let maxDefectRowCountItem = new vscode.CompletionItem("max_defects_logged:", vscode.CompletionItemKind.Property);
						maxDefectRowCountItem.documentation = new vscode.MarkdownString("Maximum number of defects logged. <br> Default value is `-1` (no limitation)");
						suggestions.push(maxDefectRowCountItem);
						let maxDefectsLoggedOnExceptionItem = new vscode.CompletionItem("max_defects_logged_on_exception:", vscode.CompletionItemKind.Property);
						maxDefectsLoggedOnExceptionItem.documentation = new vscode.MarkdownString("Maximum number of defects logged on exception. <br> Default value is `100`");
						suggestions.push(maxDefectsLoggedOnExceptionItem);
					}
				} else if (this.getParentKeyAtLevel(document, position.line, indentLevel - 1) === "python_engine") {
					if (linePrefix.trim() === "")
					{
						let loopDelayItem = new vscode.CompletionItem("loop_delay:", vscode.CompletionItemKind.Property);
						loopDelayItem.documentation = new vscode.MarkdownString("Define the loop delay for each execution. <br> Default value is `0`, which means no delay");
						suggestions.push(loopDelayItem);
						let saveProgressIntervalItem = new vscode.CompletionItem("save_progress_interval:", vscode.CompletionItemKind.Property);
						saveProgressIntervalItem.documentation = new vscode.MarkdownString("Define the save progress interval (statistics or tracking table writing). <br> Default value is `60`, which means every 60 seconds");
						suggestions.push(saveProgressIntervalItem);
					}
				} else if (this.getParentKeyAtLevel(document, position.line, indentLevel - 1) === "streaming") {
					if (linePrefix.trim() === "")
					{
						let streamEnabledItem = new vscode.CompletionItem("enabled:", vscode.CompletionItemKind.Property);
						streamEnabledItem.documentation = new vscode.MarkdownString("Define whether the streaming is enabled. <br> It has to be set to `true` if it's streaming data pipeline");
						suggestions.push(streamEnabledItem);
						let triggerIntervalItem = new vscode.CompletionItem("trigger_interval:", vscode.CompletionItemKind.Property);
						triggerIntervalItem.documentation = new vscode.MarkdownString("Define the trigger interval for streaming. <br> Default value is `5`, which means every 5 seconds to fetch new data");
						suggestions.push(triggerIntervalItem);
						let triggerTypeItem = new vscode.CompletionItem("trigger_type:", vscode.CompletionItemKind.Property);
						triggerTypeItem.documentation = new vscode.MarkdownString("Define the trigger type for streaming. <br> Default value is `interval`");
						suggestions.push(triggerTypeItem);
					}
				} else if (this.getParentKeyAtLevel(document, position.line, indentLevel - 1) === "scheduler") {
					if (linePrefix.trim() === "")
					{
						let clusterSpecItem = new vscode.CompletionItem("cluster_spec:", vscode.CompletionItemKind.Property);
						clusterSpecItem.documentation = new vscode.MarkdownString("Define the cluster specification for your data pipeline.");
						suggestions.push(clusterSpecItem);
						let runModeItem = new vscode.CompletionItem("run_mode:", vscode.CompletionItemKind.Property);
						runModeItem.documentation = new vscode.MarkdownString("Define the run mode for your data pipeline. <br> Default value is `job`");
						suggestions.push(runModeItem);
						let timeZoneItem = new vscode.CompletionItem("timezone:", vscode.CompletionItemKind.Property);
						timeZoneItem.documentation = new vscode.MarkdownString("Define the timezone for your data pipeline. <br> Default value is `UTC` and disabled. <br> You can enable it by setting `timezone_enabled`");
						suggestions.push(timeZoneItem);
						let timeZoneEnabledItem = new vscode.CompletionItem("timezone_enabled:", vscode.CompletionItemKind.Property);
						timeZoneEnabledItem.documentation = new vscode.MarkdownString("Define whether the timezone is enabled. <br> Default value is `false`");
						suggestions.push(timeZoneEnabledItem);
						let triggersItem = new vscode.CompletionItem("triggers:", vscode.CompletionItemKind.Property);
						triggersItem.documentation = new vscode.MarkdownString("Define the triggers (cron or dependency) for your data pipeline.");
						suggestions.push(triggersItem);
						let matchEnvItem = new vscode.CompletionItem("!match_env", vscode.CompletionItemKind.Property);
						matchEnvItem.documentation = new vscode.MarkdownString("match the environment to take different configuration loading.");
						suggestions.push(matchEnvItem);
					}
				} else if (this.getParentKeyAtLevel(document, position.line, indentLevel - 1) === "data_quality_check") 
				{
					if (linePrefix.trim() === "")
					{
						suggestions.push(new vscode.CompletionItem("enabled:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("only_run_dq_check:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("failure_action:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("config:", vscode.CompletionItemKind.Property));

						let sampleItem = new vscode.CompletionItem("sample:", vscode.CompletionItemKind.Property);
						sampleItem.documentation = new vscode.MarkdownString("Define the sample percentage for your data quality check. <br> Default value is `100 (all)`");
						suggestions.push(sampleItem);

					}

					if (linePrefix.trim().endsWith("enabled:")) {
						// Suggestions for 'enabled' values
						suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
					}
					if (linePrefix.trim().endsWith("only_run_dq_check:")) {
						// Suggestions for 'only_run_dq_check' values
						suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
					}
					if (linePrefix.trim().endsWith("failure_action:")) {
						// Suggestions for 'failure_action' values
						suggestions.push(new vscode.CompletionItem("stop", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("continue", vscode.CompletionItemKind.Value));
					}
				}

				if (linePrefix.trim().endsWith("enabled:")) {
					// Suggestions for 'enabled' values
					suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
				}

				if (linePrefix.trim().endsWith("trigger_type:")) {
					// Suggestions for 'trigger_type' values
					suggestions.push(new vscode.CompletionItem("interval", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("once", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("available_now", vscode.CompletionItemKind.Value));
				}

				if (linePrefix.trim().endsWith("run_mode:")) {
					// Suggestions for 'run_mode' values
					suggestions.push(new vscode.CompletionItem("job", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("notebook", vscode.CompletionItemKind.Value));
				}
				
			}
			if (this.getParentKeyAtLevel(document, position.line, 2) === "triggers") {
				if (linePrefix.trim() === "")
				{
					let cronItem = new vscode.CompletionItem("- cron:", vscode.CompletionItemKind.Property);
					cronItem.documentation = new vscode.MarkdownString("Define the cron trigger for your data pipeline.");
					suggestions.push(cronItem);
					let dependencyItem = new vscode.CompletionItem("- dependency:", vscode.CompletionItemKind.Property);
					dependencyItem.documentation = new vscode.MarkdownString("Define the dependency trigger for your data pipeline.");
					suggestions.push(dependencyItem);
				}
				if (linePrefix.trim().endsWith("- dependency:")) {
					// Suggestions for 'cron' values
					suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
				}
				
			}

            // Similarly, add conditions for other first-level keys
        } else if (indentLevel === 3) {
			// Checking if we are inside the 'source' name block
			if (topLevelKey === "source") {
				const parentKey = this.getParentKeyForLevel3(document, position.line);
				if (parentKey === "batch_reader") {
					// Suggestions for properties under 'batch_reader'
					if (linePrefix.trim() === "") 
					{
						suggestions.push(new vscode.CompletionItem("layer:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("name:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("format:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("endpoint:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("endpoint_type:", vscode.CompletionItemKind.Property));	
						suggestions.push(new vscode.CompletionItem("engine:", vscode.CompletionItemKind.Property));
						let partitionColumnsItem = new vscode.CompletionItem("partition_columns:", vscode.CompletionItemKind.Property);
						partitionColumnsItem.documentation = new vscode.MarkdownString("Define the partition columns for your data source. <br> The type is `list` not `string`.");
						suggestions.push(partitionColumnsItem);
						let preProcessFunctionsItem = new vscode.CompletionItem("preprocess_functions:", vscode.CompletionItemKind.Property);
						preProcessFunctionsItem.documentation = new vscode.MarkdownString("Define the preprocess functions. <br> The type is `list` not `string`.");
						suggestions.push(preProcessFunctionsItem);
						suggestions.push(new vscode.CompletionItem("driving:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("file_mask:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("increment_method:", vscode.CompletionItemKind.Property));

						let schemaItem = new vscode.CompletionItem("schema:", vscode.CompletionItemKind.Property);
						schemaItem.documentation = new vscode.MarkdownString("Define the schema for your data source by using simple string schema format like: struct<col1: string, col2: int>");
						suggestions.push(schemaItem);
						
						let autoLoaderItem = new vscode.CompletionItem("auto_loader:", vscode.CompletionItemKind.Property);
						autoLoaderItem.documentation = new vscode.MarkdownString("Define the auto loader processing parameters.");
						suggestions.push(autoLoaderItem);
						
						let handlingClassItem = new vscode.CompletionItem("handling_class:", vscode.CompletionItemKind.Property);
						handlingClassItem.documentation = new vscode.MarkdownString("Define the handling class for your data source. You can define your custom source handler here.");
						suggestions.push(handlingClassItem);
						
						let limitItem = new vscode.CompletionItem("limit:", vscode.CompletionItemKind.Property);
						limitItem.documentation = new vscode.MarkdownString("Define the limit when processing files including `max_files` and `max_bytes`.");
						suggestions.push(limitItem);

						let optionsItem = new vscode.CompletionItem("options:", vscode.CompletionItemKind.Property);
						optionsItem.documentation = new vscode.MarkdownString("Define the options for your data source, majorly for csv, xml files.");
						suggestions.push(optionsItem);
						let trackingColumnItem = new vscode.CompletionItem("tracking_column:", vscode.CompletionItemKind.Property);
						trackingColumnItem.documentation = new vscode.MarkdownString("Column name to be used for incremental loading");
						suggestions.push(trackingColumnItem);
						let trackingColumnTypeItem = new vscode.CompletionItem("tracking_column_type:", vscode.CompletionItemKind.Property);
						trackingColumnTypeItem.documentation = new vscode.MarkdownString("Default column type is timestamp, you can use timestamp, decimal, int, binary and string");
						suggestions.push(trackingColumnTypeItem);
						suggestions.push(new vscode.CompletionItem("tracking_column_expr:", vscode.CompletionItemKind.Property));
						let peekEnabledItem = new vscode.CompletionItem("peek_enabled:", vscode.CompletionItemKind.Property);
						peekEnabledItem.documentation = new vscode.MarkdownString("Only available for SQL Server");
						suggestions.push(peekEnabledItem);
					}
					if (linePrefix.trim().endsWith("format:")) {
						// Suggestions for 'format' values
						suggestions.push(new vscode.CompletionItem("delta", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("jdbc_sqlserver", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("jdbc_mysql", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("jdbc_oracle", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("jdbc_synapse", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("csv", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("json", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("parquet", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("avro", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("xml", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("xlsx", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("db2", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("samba", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("binary", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("unity_catalog", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("query", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("view", vscode.CompletionItemKind.Value));
					}
					if (linePrefix.trim().endsWith("layer:")) {
						// Suggestions for 'layer' values
						suggestions.push(new vscode.CompletionItem("raw", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("bronze", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("silver", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("gold", vscode.CompletionItemKind.Value));
                        suggestions.push(new vscode.CompletionItem("external", vscode.CompletionItemKind.Value));
					}
					if (linePrefix.trim().endsWith("engine:")) {
						// Suggestions for 'engine' values
						suggestions.push(new vscode.CompletionItem("spark", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("python", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("sql_tracker", vscode.CompletionItemKind.Value));

						let pandasEngineItem = new vscode.CompletionItem("pandas", vscode.CompletionItemKind.Value);
						pandasEngineItem.documentation = new vscode.MarkdownString("Only available for xlsx File Data source");
						suggestions.push(pandasEngineItem);
						let requestsEngineItem = new vscode.CompletionItem("requests", vscode.CompletionItemKind.Value);
						requestsEngineItem.documentation = new vscode.MarkdownString("Only available for HTTP Data source");
						suggestions.push(requestsEngineItem);
					}
					if (linePrefix.trim().endsWith("driving:")) {
						// Suggestions for 'driving' values
						suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
					}
					if (linePrefix.trim().endsWith("increment_method:")) {
						// Suggestions for 'increment_method' values
						let fullLoadItem = new vscode.CompletionItem("full_load", vscode.CompletionItemKind.Property);
						fullLoadItem.documentation = new vscode.MarkdownString("Load full data from sql related database");
						suggestions.push(fullLoadItem);
						let newRecordsItem = new vscode.CompletionItem("new_records", vscode.CompletionItemKind.Property);
						newRecordsItem.documentation = new vscode.MarkdownString("Load new records from sql related database or delta tables");
						suggestions.push(newRecordsItem);
						let newFilesItem = new vscode.CompletionItem("new_files", vscode.CompletionItemKind.Property);
						newFilesItem.documentation = new vscode.MarkdownString("Load new files from file system by using Auto Loader");
						suggestions.push(newFilesItem);
						let fullDatasetItem = new vscode.CompletionItem("full_dataset", vscode.CompletionItemKind.Property);
						fullDatasetItem.documentation = new vscode.MarkdownString("Load full dataset from delta tables");
						suggestions.push(fullDatasetItem);
					}
					if (linePrefix.trim().endsWith("peek_enabled:")) {
						// Suggestions for 'peek_enabled' values
						suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
					}
					if (linePrefix.trim().endsWith("tracking_column_type:")) {
						// Suggestions for 'tracking_column_type' values
						suggestions.push(new vscode.CompletionItem("timestamp", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("decimal", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("int", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("string", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("binary", vscode.CompletionItemKind.Value));
					}
					// ... add more properties for 'batch_reader'
				} else if (parentKey === "stream_reader") {
					if (linePrefix.trim() === "") 
					{
						suggestions.push(new vscode.CompletionItem("layer:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("name:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("format:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("endpoint:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("engine:", vscode.CompletionItemKind.Property));
						let preProcessFunctionsItem = new vscode.CompletionItem("preprocess_functions:", vscode.CompletionItemKind.Property);
						preProcessFunctionsItem.documentation = new vscode.MarkdownString("Define the preprocess functions. <br> The type is `list` not `string`.");
						suggestions.push(preProcessFunctionsItem);
						suggestions.push(new vscode.CompletionItem("verbose_metrics:", vscode.CompletionItemKind.Property));
						let consumerGroupItem = new vscode.CompletionItem("consumer_group:", vscode.CompletionItemKind.Property);
						consumerGroupItem.documentation = new vscode.MarkdownString("Consumer group name for Event Hub");
						suggestions.push(consumerGroupItem);
						suggestions.push(new vscode.CompletionItem("file_mask:", vscode.CompletionItemKind.Property));

						let recursiveItem = new vscode.CompletionItem("recursive:", vscode.CompletionItemKind.Property);
						recursiveItem.documentation = new vscode.MarkdownString("Define whether to recursively process files in the directory. <br> Default value is `false`");
						suggestions.push(recursiveItem);

						let createEmptyWhenNoDataItem = new vscode.CompletionItem("create_empty_when_no_data:", vscode.CompletionItemKind.Property);
						createEmptyWhenNoDataItem.documentation = new vscode.MarkdownString("Define whether to create empty dataframe when no data is found. Valid for auto loader <br> Default value is `false`");
						suggestions.push(createEmptyWhenNoDataItem);

						let handlingClassItem = new vscode.CompletionItem("handling_class:", vscode.CompletionItemKind.Property);
						handlingClassItem.documentation = new vscode.MarkdownString("Define the handling class for your data source. You can define your custom source handler here.");
						suggestions.push(handlingClassItem);

						let optionsItem = new vscode.CompletionItem("options:", vscode.CompletionItemKind.Property);
						optionsItem.documentation = new vscode.MarkdownString("Streaming data source options.");
						suggestions.push(optionsItem);

						let autoLoaderItem = new vscode.CompletionItem("auto_loader:", vscode.CompletionItemKind.Property);
						autoLoaderItem.documentation = new vscode.MarkdownString("Define the auto loader processing parameters.");
						suggestions.push(autoLoaderItem);

						let peekEnabledItem = new vscode.CompletionItem("peek_enabled:", vscode.CompletionItemKind.Property);
						peekEnabledItem.documentation = new vscode.MarkdownString("Only available for SQL Server");
						suggestions.push(peekEnabledItem);
						
						let trackingColumnItem = new vscode.CompletionItem("tracking_column:", vscode.CompletionItemKind.Property);
						trackingColumnItem.documentation = new vscode.MarkdownString("Column name to be used for incremental loading. Only for SQL Server Streaming.");
						suggestions.push(trackingColumnItem);
						let trackingColumnTypeItem = new vscode.CompletionItem("tracking_column_type:", vscode.CompletionItemKind.Property);
						trackingColumnTypeItem.documentation = new vscode.MarkdownString("Default column type is timestamp, you can use timestamp, decimal, int, binary and string");
						suggestions.push(trackingColumnTypeItem);
						let trackingColumnsItem = new vscode.CompletionItem("tracking_columns:", vscode.CompletionItemKind.Property);
						trackingColumnsItem.documentation = new vscode.MarkdownString("Column names (combination) to be used for incremental loading. Only for SQL Server Streaming. <br> The type is `list` not `string`.");
						suggestions.push(trackingColumnsItem);
					}

					if (linePrefix.trim().endsWith("format:")) {
						// Suggestions for 'format' values
						suggestions.push(new vscode.CompletionItem("json", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("xml", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("binary", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("delta", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("csv", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("avro", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("parquet", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("query", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("view", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("rate", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("jdbc_sqlserver", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("jdbc_synapse", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("jdbc_oracle", vscode.CompletionItemKind.Value));

					}

					if (linePrefix.trim().endsWith("engine:")) {
						// Suggestions for 'engine' values
						suggestions.push(new vscode.CompletionItem("spark", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("python", vscode.CompletionItemKind.Value));
					}
					if (linePrefix.trim().endsWith("verbose_metrics:")) {
						// Suggestions for 'verbose_metrics' values
						suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
					}
					if (linePrefix.trim().endsWith("peek_enabled:")) {
						// Suggestions for 'peek_enabled' values
						suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
					}
					if (linePrefix.trim().endsWith("layer:")){
						// Suggestions for 'layer' values
						suggestions.push(new vscode.CompletionItem("raw", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("bronze", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("silver", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("gold", vscode.CompletionItemKind.Value));
                        suggestions.push(new vscode.CompletionItem("external", vscode.CompletionItemKind.Value));
					}

					// Suggestions for properties under 'stream_reader'
					// ... add properties for 'stream_reader'
				}
				// ... add more third-level suggestions
			} else if (topLevelKey === "settings") 
			{
			    const ret_keys = this.getKeysAtLevel(document, position.line, indentLevel - 1);
				if (ret_keys[0] === "triggers" || ret_keys[1] === "triggers") {
					if (linePrefix.trim() === "")
					{
						let cronItem = new vscode.CompletionItem("cron:", vscode.CompletionItemKind.Property);
						cronItem.documentation = new vscode.MarkdownString("Define the cron trigger for your data pipeline.");
						suggestions.push(cronItem);
						let dependencyItem = new vscode.CompletionItem("dependency:", vscode.CompletionItemKind.Property);
						dependencyItem.documentation = new vscode.MarkdownString("Define the dependency trigger for your data pipeline.");
						suggestions.push(dependencyItem);
					}
					if (linePrefix.trim().endsWith("dependency:")) {
						// Suggestions for 'cron' values
						suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
					}
				}
				if (this.getParentKeyAtLevel(document, position.line, indentLevel - 1) === "cluster_spec") {
					if (linePrefix.trim() === "")
					{
						let existingClusterItem = new vscode.CompletionItem("existing_cluster:", vscode.CompletionItemKind.Property);
						existingClusterItem.documentation = new vscode.MarkdownString("Define the existing cluster name for your data pipeline. Only one of `existing_cluster` and `existing_cluster_id` can be specified.");
						suggestions.push(existingClusterItem);

						let existingClusterIdItem = new vscode.CompletionItem("existing_cluster_id:", vscode.CompletionItemKind.Property);
						existingClusterIdItem.documentation = new vscode.MarkdownString("Define the existing cluster id for your data pipeline. Only one of `existing_cluster` and `existing_cluster_id` can be specified.");
						suggestions.push(existingClusterIdItem);

						let instancePoolNameItem = new vscode.CompletionItem("instance_pool_name:", vscode.CompletionItemKind.Property);
						instancePoolNameItem.documentation = new vscode.MarkdownString("Define the instance pool name for your data pipeline. It's not required if you specified `existing_cluster` or `existing_cluster_id`.");
						suggestions.push(instancePoolNameItem);

						let nodeTypeIdItem = new vscode.CompletionItem("node_type_id:", vscode.CompletionItemKind.Property);
						nodeTypeIdItem.documentation = new vscode.MarkdownString("Define the node type id for your data pipeline. You must define it if no `existing_cluster`, `existing_cluster_id` or `instance_pool_name` are specified.");
						suggestions.push(nodeTypeIdItem);

						let numWorkersItem = new vscode.CompletionItem("num_workers:", vscode.CompletionItemKind.Property);
						numWorkersItem.documentation = new vscode.MarkdownString("Define the number of workers for your data pipeline. 0 for single node; positive integer for multi-node.");
						suggestions.push(numWorkersItem);

						let autoscaleItem = new vscode.CompletionItem("autoscale:", vscode.CompletionItemKind.Property);
						autoscaleItem.documentation = new vscode.MarkdownString("Define whether the cluster is autoscale enabled.");
						suggestions.push(autoscaleItem);

						let sparkConfItem = new vscode.CompletionItem("spark_conf:", vscode.CompletionItemKind.Property);
						sparkConfItem.documentation = new vscode.MarkdownString("Define the spark configuration for your data pipeline.");
						suggestions.push(sparkConfItem);

					}
				}
				if (this.getParentKeyAtLevel(document, position.line, indentLevel - 1) === "match_env") {
					if (linePrefix.trim() === "")
					{
						let devItem = new vscode.CompletionItem("dev:", vscode.CompletionItemKind.Property);
						devItem.documentation = new vscode.MarkdownString("Define dev environment data pipeline context.");
						suggestions.push(devItem);
						
						let testItem = new vscode.CompletionItem("test:", vscode.CompletionItemKind.Property);
						testItem.documentation = new vscode.MarkdownString("Define test environment data pipeline context.");
						suggestions.push(testItem);

						let uatItem = new vscode.CompletionItem("uat:", vscode.CompletionItemKind.Property);
						uatItem.documentation = new vscode.MarkdownString("Define uat environment data pipeline context.");
						suggestions.push(uatItem);

						let prodItem = new vscode.CompletionItem("prod:", vscode.CompletionItemKind.Property);
						prodItem.documentation = new vscode.MarkdownString("Define prod environment data pipeline context.");
						suggestions.push(prodItem);
					}
					if (linePrefix.trim().endsWith(":")) {
						// Suggestions for 'dev' values
						suggestions.push(new vscode.CompletionItem("!load_yaml ", vscode.CompletionItemKind.Property));}
				}
				if (linePrefix.trim().endsWith("spark_conf:"))
				{	
					let loadYamlItem = new vscode.CompletionItem("!load_yaml ", vscode.CompletionItemKind.Property);
					loadYamlItem.documentation = new vscode.MarkdownString("Load the spark configuration from existing yaml file.");
					suggestions.push(loadYamlItem);
				}
			}
		} else if (indentLevel === 4) {
			if (topLevelKey === "settings") 
			{
				if (this.getParentKeyAtLevel(document, position.line, indentLevel - 1) === "cron" || this.getParentKeyAtLevel(document, position.line, indentLevel - 2) === "cron") 
				{
					if (linePrefix.trim() === "")
					{
						suggestions.push(new vscode.CompletionItem("minute:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("hour:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("day_of_month:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("month:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("day_of_week:", vscode.CompletionItemKind.Property));
					}
				}
				if (this.getParentKeyAtLevel(document, position.line, indentLevel - 1) === "autoscale"){
					if (linePrefix.trim() === "")
					{
						suggestions.push(new vscode.CompletionItem("min_workers:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("max_workers:", vscode.CompletionItemKind.Property));
					}
				}

			} else if (topLevelKey === "source") {
				if (this.getParentKeyAtLevel(document, position.line, indentLevel - 1) === "auto_loader") {
					if (linePrefix.trim() === "")
					{
						suggestions.push(new vscode.CompletionItem("include_existing_files:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("queue_name:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("schema_evolution_mode:", vscode.CompletionItemKind.Property));
					}
					if (linePrefix.trim().endsWith("include_existing_files:")) {
						// Suggestions for 'include_existing_files' values
						suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
					}

				}
				if (this.getParentKeyAtLevel(document, position.line, indentLevel - 1) === "limit") {
					if (linePrefix.trim() === "")
					{
						suggestions.push(new vscode.CompletionItem("max_files:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("max_bytes:", vscode.CompletionItemKind.Property));
					}
				}
				if (this.getParentKeyAtLevel(document, position.line, indentLevel -1) === "options") {
					if (this.getParentKeyAtLevel(document, position.line, indentLevel - 2) === "batch_reader") 
					{
						if (linePrefix.trim() === "")
						{
							suggestions.push(new vscode.CompletionItem("header:", vscode.CompletionItemKind.Property));
							suggestions.push(new vscode.CompletionItem("inferSchema:", vscode.CompletionItemKind.Property));
							suggestions.push(new vscode.CompletionItem("sep:", vscode.CompletionItemKind.Property));
							suggestions.push(new vscode.CompletionItem("sheet_name:", vscode.CompletionItemKind.Property));

							let db2limitItem = new vscode.CompletionItem("limit:", vscode.CompletionItemKind.Property);
							db2limitItem.documentation = new vscode.MarkdownString("Define the record return limit from db2 source.");
							suggestions.push(db2limitItem);
						}
						if (linePrefix.trim().endsWith("header:")) {
							// Suggestions for 'header' values
							suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
							suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
						}
					} else if (this.getParentKeyAtLevel(document, position.line, indentLevel - 2) === "stream_reader") {
						if (linePrefix.trim() === "")
						{
							let ignoreChangesItem = new vscode.CompletionItem("ignoreChanges:", vscode.CompletionItemKind.Property);
							ignoreChangesItem.documentation = new vscode.MarkdownString("Define whether the changes are ignored in delta streaming. <br> Default value is `true`");
							suggestions.push(ignoreChangesItem);
							let maxFilesPerTriggerItem = new vscode.CompletionItem("maxFilesPerTrigger:", vscode.CompletionItemKind.Property);
							maxFilesPerTriggerItem.documentation = new vscode.MarkdownString("Define the maximum number of new files to be considered in every trigger in delta streaming. <br> Default value is `1000`");
							suggestions.push(maxFilesPerTriggerItem);
							let maxBytesPerTriggerItem = new vscode.CompletionItem("maxBytesPerTrigger:", vscode.CompletionItemKind.Property);
							maxBytesPerTriggerItem.documentation = new vscode.MarkdownString("Define the maximum number of new bytes to be considered in every trigger in delta streaming. <br> Default value is `31457280`");
							suggestions.push(maxBytesPerTriggerItem);

							let groupIdPrefixItem = new vscode.CompletionItem("groupIdPrefix:", vscode.CompletionItemKind.Property);
							groupIdPrefixItem.documentation = new vscode.MarkdownString("Define the group id prefix for kafka streaming. <br> Default value is `ara + job_fqn`");
							suggestions.push(groupIdPrefixItem);

							let startingOffsetsItem = new vscode.CompletionItem("startingOffsets:", vscode.CompletionItemKind.Property);
							startingOffsetsItem.documentation = new vscode.MarkdownString("Define the starting offsets for kafka streaming. <br> Default value is `earliest`");
							suggestions.push(startingOffsetsItem);

							let rowsPerSecondItem = new vscode.CompletionItem("rowsPerSecond:", vscode.CompletionItemKind.Property);
							rowsPerSecondItem.documentation = new vscode.MarkdownString("Define the rows per second for rate streaming. <br> Default value is `1`");
							suggestions.push(rowsPerSecondItem);
						}
						if (linePrefix.trim().endsWith("ignoreChanges:")) {
							// Suggestions for 'header' values
							suggestions.push(new vscode.CompletionItem("true", vscode.CompletionItemKind.Value));
							suggestions.push(new vscode.CompletionItem("false", vscode.CompletionItemKind.Value));
						}
					}


				}
			}

        // ... add more conditions for deeper levels
		}
        return suggestions;
    }


    // private getIndentLevel(lineText: string): number {
    //     const match = lineText.match(/^(\s*)/);
    //     return match ? match[1].length / 2 : 0; // Assuming 2 spaces per indent level
    // }
  private getIndentLevel(lineText: string): number {
      // Retrieve the active text editor
      const activeEditor = vscode.window.activeTextEditor;
      
      // Get the tabSize setting from the active editor, default to 4 if not available
      const tabSize = activeEditor ? activeEditor.options.tabSize : 4;

      // Ensure tabSize is a number before using it
      const effectiveTabSize = typeof tabSize === 'number' ? tabSize : 4;

      // Match the leading whitespace
      const match = lineText.match(/^(\s*)/);

      if (match && match[1]) {
          const leadingWhitespace = match[1];

          // Calculate indentation level based on the tab size
          let indentLevel = 0;
          for (let i = 0; i < leadingWhitespace.length; i++) {
              if (leadingWhitespace[i] === '\t') {
                  indentLevel += 1;
              } else if (leadingWhitespace[i] === ' ') {
                  indentLevel += 1 / effectiveTabSize;
              }
          }
          return indentLevel;
      }

      return 0;
  }
	// private getIndentLevel(lineText: string): number {
  //       // Get the user's indentation settings
  //       const editorOptions = vscode.workspace.getConfiguration('editor');
  //       const tabSize = editorOptions.get<number>('tabSize', 4); // Default to 4 if not set
  //       const insertSpaces = editorOptions.get<boolean>('insertSpaces', true); // Default to true if not set

  //       // Match the leading whitespace
  //       const match = lineText.match(/^(\s*)/);
  //       if (match && match[1]) {
  //           const leadingWhitespace = match[1];

  //           if (insertSpaces) {
  //               // If using spaces, divide the number of spaces by the tab size
  //               return leadingWhitespace.length / tabSize;
  //           } else {
  //               // If using tabs, count the number of tab characters
  //               return leadingWhitespace.split('\t').length - 1;
  //           }
  //       }

  //       return 0;
  //   }
	
	private getTopLevelKey(document: vscode.TextDocument, currentLine: number): string | null {
        for (let i = currentLine - 1; i >= 0; i--) {
            const lineText = document.lineAt(i).text;
            if (this.getIndentLevel(lineText) === 0) {
                const match = lineText.match(/^(\w+):/);
                if (match) {
                    return match[1];
                }
            }
        }
        return null;
    }

	private extractDirective(lineText: string): string | null {
        const match = lineText.trim().match(/^- !(\w+)/);
        return match ? match[1] : null;
    }

	private getDirectiveAbove(document: vscode.TextDocument, currentLine: number): string | null {
        for (let i = currentLine - 1; i >= 0; i--) {
            const lineText = document.lineAt(i).text;
            if (lineText.trim().startsWith("- !")) {
                // Extracting directive
                const directiveMatch = lineText.trim().match(/^- !(\w+)/);
                return directiveMatch ? directiveMatch[1] : null;
            }
            if (lineText.trim() === '' || this.getIndentLevel(lineText) < 2) {
                // Reached the start of another block or an empty line
                break;
            }
        }
        return null;

    }
	private getContentOfLineAbove(document: vscode.TextDocument, currentLine: number): string | null {
        if (currentLine > 0) {
            const lineText = document.lineAt(currentLine - 1).text;
            return lineText.trim();
        }
        return null; // Return null if there is no line above (i.e., currentLine is the first line)
    }

	private getParentKeyForLevel3(document: vscode.TextDocument, currentLine: number): string | null {
        for (let i = currentLine - 1; i >= 0; i--) {
            const lineText = document.lineAt(i).text;
            const indentLevel = this.getIndentLevel(lineText);
            if (indentLevel === 2) {
                // Extract the key at this line
                const keyMatch = lineText.trim().match(/^(-\s*)?(\w+):/);
                if (keyMatch) {
                    return keyMatch[2];
                }
            }
            if (indentLevel < 2) {
                // Reached a higher level block
                break;
            }
        }
        return null;
	}
	
	private getKeysAtLevel(document: vscode.TextDocument, currentLine: number, targetIndentLevel: number): string[] {
		let keys = [];
		for (let i = currentLine - 1; i >= 0; i--) {
			const lineText = document.lineAt(i).text;
			const indentLevel = this.getIndentLevel(lineText);
			if (indentLevel === targetIndentLevel) {
				// Extract the key at this line
				const keyMatch = lineText.trim().match(/^(-\s*)?(\w+):/);
				if (keyMatch) {
					keys.push(keyMatch[2]);
				}
			} else if (indentLevel < targetIndentLevel) {
				// Reached a higher level block, return the collected keys
				return keys;
			}
		}
		return keys;
	}
	

	private getParentKeyAtLevel(document: vscode.TextDocument, currentLine: number, targetIndentLevel: number): string | null {
        for (let i = currentLine - 1; i >= 0; i--) {
            const lineText = document.lineAt(i).text;
            const indentLevel = this.getIndentLevel(lineText);
            if (indentLevel === targetIndentLevel) {
                // Extract the key at this line
				const trim_line = lineText.trim();
				if (!trim_line.startsWith("!")) {
					const keyMatch = trim_line.match(/^(-\s*)?(\w+):/);
					if (keyMatch) {
						return keyMatch[2];
					}
				}
				else {
					const keyMatch = trim_line.match(/^(!\s*)?(\w+)/);
					if (keyMatch) {
						return keyMatch[2];
					}

				}
            }
            if (indentLevel < targetIndentLevel) {
                // Reached a higher level block
                break;
            }
        }
        return null;
    }

}
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

class YamlHoverProvider implements vscode.HoverProvider {
    provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
        const range = document.getWordRangeAtPosition(position);
        const word = document.getText(range);

        // Provide hover information based on the word (key)
        if (word === 'name:') {
			const hoverContent = new vscode.MarkdownString();
			hoverContent.appendMarkdown("**name**: if it's the name of data source or destination:\n\n");
            hoverContent.appendMarkdown("- Type: `string`, required \n\n");
            hoverContent.appendMarkdown("- Usage:  \n\n");
            hoverContent.appendMarkdown("  - For delta table / file system, it's the relative path of mounting \n\n");
            hoverContent.appendMarkdown("  - For relational database, it's the <schema>.<table> \n\n");
            hoverContent.appendMarkdown("  - For event hub, it's the name of event hub \n\n");
            hoverContent.appendMarkdown("  - For kafka, it's the name of kafka topic \n\n");
            hoverContent.appendMarkdown("  - For http, it's the url path of http (based on the endpoint) \n\n\n\n");
            hoverContent.appendMarkdown("**name**: if it's the name defined under job_def. It's the data pipeline base name (without path) with '/' is replace by '.' like `flights` .\n\n");
            hoverContent.appendMarkdown("- Type: `string`, required \n\n");

			hoverContent.isTrusted = true; // Allow command links and other features
            return new vscode.Hover(hoverContent);
        }
        if (word === 'layer:') {
            const hoverContent = new vscode.MarkdownString();
            hoverContent.appendMarkdown("**layer**: Define the layer of your data pipeline. \n\n");
            hoverContent.appendMarkdown("- Type: `string`, required \n\n");
            hoverContent.appendMarkdown("- Suggested values: `raw`, `bronze`, `silver`, `gold`, `external`. Users can choose the layer names they liked. \n\n");
            hoverContent.appendMarkdown("- Usage: \n\n");
            hoverContent.appendMarkdown("  - `external`: the external data layer, the data is not processed \n\n");
            hoverContent.appendMarkdown("  - `raw`: the raw data layer, the data is not processed, just copied from external \n\n");
            hoverContent.appendMarkdown("  - `bronze`: the bronze data layer, the data is processed but not aggregated \n\n");
            hoverContent.appendMarkdown("  - `silver`: the silver data layer, the data is processed, joined, and aggregated \n\n");
            hoverContent.appendMarkdown("  - `gold`: the gold data layer, the data is processed, aggregated and ready for consumption \n\n");
            hoverContent.isTrusted = true; // Allow command links and other features
            return new vscode.Hover(hoverContent);
        } 

        if (word === 'format:') {
			const hoverText = 
			"**format**: Define the format of data pipeline data source and destination.\n\n" +
			"- Type: `string`, required\n\n" +
			"- Allowed values:\n\n" +
			"  - `delta`: delta table. Across all layers\n\n" +
			"  - `csv`: csv file. Usually mapping to `external` layer.\n\n" +
			"  - `json`: json file. Usually mapping to `external` layer.\n\n" +
			"  - `parquet`: parquet file. Usually mapping to `external` layer.\n\n" +
			"  - `avro`: avro file. Usually mapping to `external` layer.\n\n" +
			"  - `binary`: binary file. Usually for http endpoint to get file binary content\n\n" +
			"  - `binary_body`: Usually for http endpoint. It's used to get files related metadata like file_extension, folder, file_name etc.\n\n" +
			"  - `xml`: xml file. Usually mapping to `external` layer.\n\n" +
			"  - `xlsx`: xlsx file. Usually mapping to `external` layer, with `engine: pandas`\n\n" +
			"  - `db2`: db2 table. Usually mapping to `external` layer.\n\n" +
			"  - `samba`: samba file. Usually mapping to `external` layer.\n\n" +
			"  - `unity_catalog`: unity catalog table or view. Usually used in `source` section\n\n" +
			"  - `query`: Databricks sql query result\n\n" +
			"  - `view`: view built in Databricks\n\n" +
			"  - `jdbc_sqlserver`: sql server table. Usually mapping to `external` layer.\n\n" +
			"  - `jdbc_synapse`: synapse table. Usually mapping to `external` layer.\n\n" +
			"  - `jdbc_oracle`: oracle table. Usually mapping to `external` layer.\n\n" +
			"  - `jdbc_mysql`: mysql table. Usually mapping to `external` layer.\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'engine:') {
			const hoverText = 
			"**engine**: Define the engine of data pipeline data source and destination. And if transformations are required, the engine must be `spark`. \n\n" +
			"- Type: `string`, optional\n\n" +
			"- Allowed values:\n\n" +
			"  - `spark`: spark engine. The default engine\n\n" +
			"  - `python`: python engine (not a valid value in ara). It doesn't need to be specified if it needs to be used. Ara will get `core_engine` from context and do the justification by its own \n\n" +
			"  - `sql_tracker`: sql tracker engine, and only valid on `source` - `jdbc_sqlserver`, `jdbc_oracle` and `jdbc_synapse` when `query` and `exec` not used. \n\n" +
			"  - `pandas`: pandas engine. Usually used in `source` section when format is `binary_body`\n\n" +
			"  - `requests`: requests engine. Usually used in `source` section where source endpoint is http (api)\n\n" +
			"     - example: \n\n" +
			"       ```yaml\n\n" +
			"       batch_reader:\n\n" +
			"         layer: external\n\n" +
			"         endpoint: api-weather\n\n" +
			"         format: binary_body\n\n" +
			"         name: '/data/2.5/onecall?lat={lat}&lon={lon}&appid={kv_apikey}'\n\n" +
			"         engine: requests\n\n" +
			"         requests:\n\n" +
			"           dynamic_parameters:\n\n" +
			"             sqlQuery: \n\n" +
			"               select lat, lon from location_list2\n\n" +
			"        ```";
			return(this.createHover(hoverText));

        } else if (word === 'endpoint:') {
			const hoverText =
			"**endpoint**: Define the endpoint of data pipeline data source and destination. It's required if the endpoint is not the default one in the layer. \n\n" +
			"- Type: `string`, optional\n\n" +
			"- values: they are defined on `/endpoints/` folder. \n\n" +
			"- how to fetch the checkpoints: \n\n" +
			"  ```python\n\n" +
			"  from ara.common.Configuration import Configuration\n\n" +
			"  eps = Configuration.get_endpoints()\n\n" +
			"  ep = Configuration.get_endpoint('endpoint_name')\n\n" +
			"  ```\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'increment_method:') {
			const hoverText =
			"**increment_method**: Define the increment method of data pipeline data source. \n\n" +
			"- Type: `string`, optional\n\n" +
			"- Allowed values: \n\n" +
			"  - `full_load`: load full records from a table of jdbc_sqlserver, jdbc_oracle, jdbc_mysql, and jdbc_synapse type. \n\n" +
			"  - `full_dataset`: load full dataset from a table of delta, db2, saleforce, and unity_catalog type. \n\n" +
			"  - `new_records`: load new/changed records from all sources except auto loader. \n\n" +
			"  - `new_files`: load new files from auto loader. \n\n" +
			"- For delta table, if `increment_method` is not specified, Ara will generate the following views in data processing: " +
			"  - `<name of source>__all` - all records (as for `increment_method: full_dataset`) \n\n" +
			"  - `<name of source>__all_partitions` - all partitions \n\n" +
			"  - `<name of source>__changed_records` - changed records (as for `increment_method: new_records`) \n\n" +
			"  - `<name of source>__changed_partitions` - changed partitions (as for `increment_method: new_partitions`) \n\n";
			return(this.createHover(hoverText));
		
		} else if (word === 'preprocess_functions:') {
			const hoverText =
			"**preprocess_functions**: Define the preprocess functions in data source. \n\n" +
			"- Type: `list`, optional\n\n" +
			"- values: \n\n" +
			"  - preprocess function name if the function only has one parameter df (dataframe). e.g. function_1(df) \n\n" +
			"  - preprocess function name and 5 parameters if the function has more than one parameter. e.g. function_2(df, src_name, src_def, self_obj, args) \n\n" +
			"- example: \n\n" +
			"  ```yaml\n\n" +
			"  source:\n\n" +
			"    src:\n\n" +
			"      batch_reader:\n\n" +
			"        ...\n\n" +
			"        preprocess_functions: ['function1', {'function2':{'arg1': 2, 'arg2': 3}}]\n\n" +
			"  ```";
			return(this.createHover(hoverText));
		
		} else if (word === 'tracking_column:') {
			const hoverText =
			"**tracking_column**: Define the tracking column of data source in order to get incremental records. It is needed when you use `new_records` in `increment_method` and `format` is not `delta` \n\n" +
			"default tracking column type is `timestamp`, you can use `timestamp`, `decimal`, `int`, `binary` and `string` \n\n" +
			"- Type: `string`, optional\n\n" +
			"- Allowed values: \n\n" +
			"  - column name of the data source. \n\n" +
			"- example: \n\n" +
			"  ```yaml\n\n" +
			"  source:\n\n" +
			"    src:\n\n" +
			"      batch_reader:\n\n" +
			"        format: jdbc_oracle \n\n" +
			"		 increment_method: new records\n\n" +
			"        tracking_column: last_updated\n\n" +
			"  ```";
			return(this.createHover(hoverText));
		
		} else if (word === 'tracking_column_expr:') {
			const hoverText =
			"**tracking_column_expr**: Define the tracking column expression of data source. It is needed when no current columns can take tracking_column role. \n\n" +
			"- Type: `string`, optional\n\n" +
			"- Allowed values: \n\n" +
			"  - spark sql column expression. \n\n" +
			"- example: \n\n" +
			"  ```yaml\n\n" +
			"  source:\n\n" +
			"    src:\n\n" +
			"      batch_reader:\n\n" +
			"        format: jdbc_sqlserver \n\n" +
			"		 increment_method: new records\n\n" +
			"        tracking_column_expr: cast(last_updated as date)\n\n" +
			"        ... \n\n" +
			"  ```";
			return(this.createHover(hoverText));
	
		} else if (word === 'write_mode:') {
			const hoverText =
			"**write_mode**: Define the write mode of data destination. \n\n" +
			"- Type: `string`, required\n\n" +
			"- Allowed values: \n\n" +
			"  - `overwrite`: overwrite the existing data. Valid for files, jdbc_sqlserver, jdbc_synapse and jdbc_oracle \n\n" +
			"  - `append`: append to the existing data. Valid for all data format \n\n" +
			"  - `replace_partitions`: replace the existing partitions. This is only valid when the destination is file. \n\n" +
			"  - `replace`: `marked` the existing data matched as deleted and replace (upsert) them with the new/changed data. Valid for delta table \n\n" +
			"  - `upsert`: Valid for delta, jdbc_sqlserver, jdbc_sysnpase, and jdbc_oracle \n\n" +
			"  - `scd_technical_events_dedupe`: scd support. scd processing with incoming data deduplication by `primary_key` and `event_order`. Valid for delta table \n\n" +
			"  - `scd_technical_events`: scd support. scd processing without incoming data deduplication. Valid for delta table \n\n";
			
			return(this.createHover(hoverText));
		} else if (word === 'pk_violations_handling_action:'){
			const hoverText =
			"**pk_violations_handling_action**: Define the primary key violations handling action of data destination. \n\n" +
			"- Type: `string`, optional. It's required if write_mode is `upsert`, `replace`\n\n" +
			"- Allowed values: \n\n" +
			"  - `pickone`: pick one record from the duplicated records. \n\n" +
			"  - `error`, `fail`, `throw`: raise error when there are duplicated records. \n\n" +
			"  - `reject`: reject all duplicated records. \n\n" +
			"default value is `error` \n\n";
			return(this.createHover(hoverText));

		} else if (word === 'scope_key:') {
			const hoverText =
			"**scope_key**: Define the scope key of data destination. It is supposed to use when `write_mode` is `replace`, or `write_mode` is `scd_technical_events` or `scd_technical_events_dedupe` \n\n" +
			"- Type: `list`, optional\n\n" +
			"- Allowed values: \n\n" +
			"  - column names of the data destination. \n\n" +
			"- example: \n\n" +
			"  ```yaml\n\n" +
			"  destination:\n\n" +
			"    dest:\n\n" +
			"      ...\n\n" +
			"      format: delta \n\n" +
			"	   write_mode: replace\n\n" +
			"	   primary_key: [id, name, org]\n\n" +
			"      scope_key: [id, name]\n\n" +
			"  ```";
			return(this.createHover(hoverText));
		} else if (word === 'scd_excluded_comparison_columns:'){
			const hoverText =
			"**scd_excluded_comparison_columns**:  Lists the columns to be excluded when comparing the incoming data frame (df) with the target df during the SCD process. Ara can compare the incoming data with the target data to avoid unnecessary updates. For example, if the incoming data is identical to the target data, there is no need to update the target data. This option allows you to exclude columns from the comparison process. It is supposed to use when `write_mode` is `scd_technical_events` or `scd_technical_events_dedupe` \n\n" +
			"- Type: `list`, optional\n\n";

			return(this.createHover(hoverText));

		} else if (word === 'scd_excluded_dedup_comparison_cols:'){
			const hoverText =
			"**scd_excluded_dedup_comparison_cols**: Lists of the columns to be execluded when doing deduplication on the incoming data frame (df). With this parameter, users can now easily omit specific columns from their data during the Slowly Changing Dimension (SCD) deduplication process. This enhancement is applicable only when using the scd_excluded_dedup_comparison_cols write mode. (Notes: this parameter is only available in ara `1.3.2` and above). It is supposed to use when `write_mode` is `scd_technical_events_dedupe` \n\n" +
			"- Type: `list`, optional\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'valid_from:') {
			const hoverText =
			"**valid_from**: Specifies the column name that represents the starting validity timestamp of a record in data destination. column type can be `date` or `timestamp`. It is supposed to use when `write_mode` is `scd_technical_events` or `scd_technical_events_dedupe` \n\n" +
			"- Type: `string`, optional\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'valid_to:') {
			const hoverText =
			"**valid_to**: Specifies the column name that represents the ending validity timestamp of a record in data destination. column type can be `date` or `timestamp`. It is supposed to use when `write_mode` is `scd_technical_events` or `scd_technical_events_dedupe` \n\n" +
			"- Type: `string`, optional\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'valid_to_open_end_value:') {
			const hoverText =
			"**valid_to_open_end_value**: If not set, the latest valid_to column value defaults to null. To assign a specific value (e.g., '9999-12-31') to open-ended records, define it here. It is supposed to use when `write_mode` is `scd_technical_events` or `scd_technical_events_dedupe` \n\n" +
			"- Type: `string`, optional\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'valid_to_offset:') {
			const hoverText =
			"**valid_to_offset**: Defines the offset for the valid_to date (days) / timestamp (seconds). The default value is 0. It is supposed to use when `write_mode` is `scd_technical_events` or `scd_technical_events_dedupe` \n\n" +
			"- Type: `bigint`, optional\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'job_def:') {
			const hoverText =
			"**job_def**: Define the job definition of data pipeline including `namespace` and `name`. \n\n" +
			"- Type: `struct`, optional\n\n" +
			"- Structure: \n\n" +
			"  - `namespace`: the namespace of the job definition. It's the data pipeline path folder with `/` replaced by `.` without `pipeline.` like `raw.avair` \n\n" +
			"  - `name`: the name of the job definition. It's the data pipeline name with `/` replaced by `.` like `flights` \n\n";
			return(this.createHover(hoverText));

		} else if (word === 'data_quality_thresholds:') {
			const hoverText =
			"**data_quality_thresholds**: Define the data quality thresholds of data pipeline. Currently it can't be disabled. \n\n" +
			"- Type: `struct`, optional\n\n" +
			"- Structure: \n\n" +
			"  - `max_defect_perc` \n\n" +
			"  - `max_defect_row_count` \n\n" +
			"  - `max_defects_logged_on_exception` \n\n" +
			"  - `max_defects_logged`";
			return(this.createHover(hoverText));

		} else if (word === 'max_defect_perc:'){
			const hoverText =
			"**max_defect_perc**: Define the maximum defect percentage of data pipeline. (default value: 100, calculation: `inNullCheckRejectedCount/inRecordCount * 100  & outNullCheckRejectedCount / (inRecordCount - inNullCheckRejectedCount )`\n\n" +
			"- Type: `bigint`, optional\n\n";
			return(this.createHover(hoverText));
			
		} else if (word === 'max_defect_row_count:'){
			const hoverText =
			"**max_defect_row_count**: Define the maximum defect row count of data pipeline. (default value: -1, (default value: -1 [means no limit], calculation: `inNullCheckRejectedCount & outNullCheckRejectedCount` ))\n\n" +
			"- Type: `bigint`, optional\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'max_defects_logged_on_exception:'){
			const hoverText =
			"**max_defects_logged_on_exception**: Define the maximum defects logged on exception of data pipeline. (default value: 100)\n\n" +
			"- Type: `bigint`, optional\n\n";
			return(this.createHover(hoverText));
			
		} else if (word === 'max_defects_logged:'){
			const hoverText =
			"**max_defects_logged**: Define the maximum defects logged of data pipeline. (default value: -1)\n\n" +
			"- Type: `bigint`, optional\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'core_engine:'){
			const hoverText = 
			"**core_engine**: Define the core engine of data pipeline. \n\n" +
			"- Most Ara sources require spark engine \n\n " +
			"- The data sources required python engine include: sql server stream (`StreamReaderSqlServer`), web socket stream (`StreamReaderWebSocket`) \n\n" +
			"- The data sources you can select to use spark or python engine: eventHub destination \n\n" + 
			"- Type: `string`, optional\n\n" +
			"- Allowed values: \n\n" +
			"  - `spark`: spark engine. The default engine\n\n" +
			"  - `python`: python engine. \n\n";
			return(this.createHover(hoverText));

		} else if (word === 'streaming:'){
			const hoverText = 
			"**streaming**: Define the streaming property of a stream data pipeline. \n\n" +
			"- Type: `struct`, optional\n\n" +
			"- Structure: \n\n" +
			"  - `enabled` \n\n" +
			"  - `trigger_interval` \n\n" +
			"  - `trigger_type` \n\n";
			return(this.createHover(hoverText));

		} else if( word === 'checkpoint_strategy:'){ 
			const hoverText =
			"**checkpoint_strategy**: Define the checkpoint strategy of a data pipeline. \n\n" +
			"- Type: `string`, optional\n\n" +
			"- Default value: `delta_checkpoint`\n\n" +
			"- Allowed values: \n\n" +
			"  - `delta_checkpoint`: use delta checkpoint. Persist data to a tempoary delta table when reading or transform data. \n\n" +
			"  - `local_checkpoint`: use local checkpoint. Persist data to a local folder when reading or transform data (good for small data volume). \n\n" +
			"  - `cache`: use cache. Persist data to memory when reading or transform data. \n\n" +
			"  - `disabled`: no checkpoint. \n\n";
			return(this.createHover(hoverText));

		} else if (word === 'dependency:'){ 
			const hoverText =
			"**dependency**: Set a data pipeline trigger as dependency or not. \n\n" +
			"- Type: `boolean`, optional\n\n" +
			"- Default value: `none`\n\n" +
			"- Allowed values: \n\n" +
			"  - `true`: set the data pipeline trigger as dependency. \n\n" +
			"  - `false`: not set the data pipeline trigger as dependency. \n\n";
			return(this.createHover(hoverText));
		} else if (word === 'run_mode:'){
			const hoverText =
			"**run_mode**: Define the run mode of a data pipeline. \n\n" +
			"- Type: `string`, optional\n\n" +
			"- Default value: `job`\n\n" +
			"- Allowed values: \n\n" +
			"  - `job`: run as a job (create job in Databricks workspace). \n\n" +
			"  - `notebook`: run as a notebook. \n\n";
			return(this.createHover(hoverText));
		} else if (word === 'cron:'){
			const hoverText =
			"**cron**: Define the cron trigger of a data pipeline. \n\n" +
			"- Type: `string` or `list`, optional\n\n" +
			"- example: \n\n" +
			"  ```yaml\n\n" +
			"  - cron: '* * * * *'\n\n" +
			"  - cron: \n\n" +
			"    - minute: '*/5'\n\n" +
			"    - hour: '*'\n\n" +
			"    - day_of_month: '*'\n\n" +
			"    - month: '*'\n\n" +
			"    - day_of_week: '*'\n\n" +
			"  ```";
			return(this.createHover(hoverText));
		} else if (word === 'cluster_spec:'){
			const hoverText =
			"**cluster_spec**: Define the cluster spec of a data pipeline. \n\n" +
			"- Type: `struct`, optional\n\n" +
			"- Structure: \n\n" +
			"  - `existing_cluster` str(required=False)\n\n" +
			"  - `existing_cluster_id` str(required=False)\n\n" +
			"  - `instance_pool_name` str(required=False)\n\n" +
			"  - `node_type_id` str(required=False)\n\n" +
			"  - `num_workers` int(min=0, required=False)\n\n" +
			"  - `autoscale` include('autoscale', required=False)\n\n" +
			"    - `min_workers` int(min=0, required=True)\n\n" +
			"    - `max_workers` int(min=0, required=True)\n\n" +
			"  - `spark_conf` map(str, required=False)\n\n" +
			"- example: \n\n" +
			"  ```yaml\n\n" +
			"  cluster_spec:\n\n" +
			"    instance_pool_name: E8_10.4\n\n" +
			"    num_workers: !param [num_workers, 0]\n\n" +
			"    spark_conf: !load_yaml generic-spark-conf\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'enabled:'){
			const hoverText = 
			"**enabled**: Define whether the configuration is enabled or not. If it's necessary to have `enabled` value if it's under `streaming` configuration for streaming data pipeline \n\n" +
			"- Type: `boolean`, optional\n\n" +
			"- Allowed values: \n\n" +
			"  - `true`: enabled\n\n" +
			"  - `false`: disabled\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'trigger_interval:'){
			const hoverText =
			"**trigger_interval**: specify the time interval that databricks will check the source streaming data (unit: second). \n\n" +
			"- Type: `int`, optional\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'trigger_type:'){
			const hoverText =
			"**trigger_type**: specify the trigger type that databricks will check the source streaming data. \n\n" +
			"- Type: `string`, optional\n\n" +
			"- Allowed values: \n\n" +
			"  - `once`: only check once\n\n" +
			"  - `interval`: check continuously with interval \n\n" +
			"  - `available_now`: check the available now data once with auto optimized batches\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'scheduler:'){
			const hoverText =
			"**scheduler**: Define the scheduler property of a batch data pipeline. \n\n" +
			"- Type: `struct`, optional\n\n" +
			"- Structure: \n\n" +
			"  - `timezone` \n\n" +
			"  - `timezone_enabled` \n\n" +
			"  - `cluster_spec`\n\n";
			"  - `run_mode` \n\n";
			return(this.createHover(hoverText));

		} else if (word === 'from:') {
			const hoverText =
			"**from**: Defines the source dataset for operations. \n\n" +
			"- Type: `string`, single value\n\n" +
			"- Default value if not defined: `default`\n\n" +
			"- Defines the name of the dataset (spark's temp view) that will be used as a source of operations defined in a block\n\n" +
			"- Dependencies: when defined, `into` must be defined too\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'into:') {
			const hoverText ="**into**: Sets the destination dataset for operations, replacing existing content if necessary. \n\n" +
			"- Type: `string`, single value\n\n" +
			"- Default value if not defined: `default`\n\n" +
			"- Defines the name of the dataset (spark's temp view) that will be used as a destination of operations defined in a block\n\n" +
			"- Dependencies: when defined, `from` must be defined too\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'inStructureType:') {
			const hoverText ="**inStructureType**: Specifies the structure type of data (flat, nested, root). \n\n" +
			"- Type: `string`, single value\n\n" +
			"- Default value if not defined: `Attribute`\n\n" +
			"- Defines a structure type of flat, or nested object. Possible values are: `Attribute`, `Array`, `Root`\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'inColumnOrder:') {
			const hoverText =
			"**inColumnOrder**: Defines the order of input columns for schema construction. \n\n" +
			"- Type: `int`, `string` value\n\n" +
			"- Default value if not defined: `0`\n\n" +
			"- Represents the input column order, sorting is stable\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'inColumn:') {
			const hoverText =
			"**inColumn**: Names the input column for schema creation. \n\n" +
			"- Type: `str`, single value\n\n" +
			"- Default value: not defined\n\n" +
			"- The name of the input column, that will be used in schema creation\n\n" +
			"- Dependencies: `from` represent the source dataset, when defined, `inDataType` must be defined too\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'inDataType:') {
			const hoverText =
			"**inDataType**: Determines the datatype of the input column. \n\n" +
			"- Type: `str`\n\n" +
			"- Default value: not defined\n\n" +
			"- The datatype of the input column defined in `inColumn`. If unknown, or non deterministic, put `string` as all datatypes can be reflected as strings\n\n" +
			"- Dependencies: when defined, `inColumn` must be defined too\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'outColumnOrder:') {
			const hoverText =
			"**outColumnOrder**: Specifies the output column order in the final transformed object. \n\n" +
			"- Type: `int`, single value\n\n" +
			"- Represents the order of column specified when transformation created final output object. Sorting algorithm is stable\n\n" +
			"- Dependencies: when defined, the `outColumn` must be defined too\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'outColumn:') {
			const hoverText =
			"**outColumn**: Names the output column. \n\n" +
			"- Type: `str`, single value\n\n" +
			"- Default value: not defined\n\n" +
			"- The name of the output column.\n\n" +
			"- Dependencies: `into` represent the destination dataset, when defined, the `outDataType` must be defined too\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'outDataType:') {
			const hoverText =
			"**outDataType**: Sets the datatype for the output column. \n\n" +
			"- Type: `str`, single value\n\n" +
			"- Default value: not defined\n\n" +
			"- Determines the spark's datatype used to cast value from `inColumn` or any of the expressions\n\n" +
			"- Dependencies: when defined, the `outColumn` must be defined too\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'expression:') {
			const hoverText =
			"**expression**: Defines a pyspark expression to be executed. \n\n" +
			"- Type: `str`, single value\n\n" +
			"- Default value: not defined\n\n" +
			"- A pyspark expression that should be executed on dataframe's that are defined by `into` and `from`\n\n" +
			"- Dependencies: `from` and `into` represent the source and destination datasets, in case it's not `.` expression: `outColumn` represents the column to which the expression will be written to, cannot be used together with `expr` or `sqlExpression` or `sqlExpr`\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'expr:') {
			const hoverText =
			"**expr**: Alias for `expression`. Defines a pyspark expression to be executed. \n\n" +
			"- Type: `str`, single value\n\n" +
			"- Default value: not defined\n\n" +
			"- A pyspark expression that should be executed on dataframe's that are defined by `into` and `from`\n\n" +
			"- Dependencies: `from` and `into` represent the source and destination datasets, in case it's not `.` expression: `outColumn` represents the column to which the expression will be written to, cannot be used together with `expression` or `sqlExpression` or `sqlExpr`\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'default:') {
			const hoverText =
			"**default**: Sets a default expression for NULL values in `outColumn`. \n\n" +
			"- Type: `str`, single value\n\n" +
			"- Default value: not defined\n\n" +
			"- When defined, and when column behind `outColumn` is of NULL value, the pyspark's expression in `default` will be executed.\n\n" +
			"- Dependencies: `from` and `into` represent the source and destination datasets, `outColumn` must be defined, cannot be used together with `sqlDefault`\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'sqlExpression:') {
			const hoverText =
			"**sqlExpression**: Executes a Spark SQL expression for output. \n\n" +
			"- Type: `str`, single value\n\n" +
			"- Default value: not defined\n\n" +
			"- Executes spark's sql expression, and places result scalar value in `outColumn`\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'sqlExpr:') {
			const hoverText =
			"**sqlExpr**: Alias for `sqlExpression`. Executes a Spark SQL expression for output.\n\n" + 
			"- Type: `str`, single value\n\n" +
			"- Default value: not defined\n\n" +
			"- Executes spark's sql expression, and places result scalar value in `outColumn`\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'sqlDefault:') {
			const hoverText = 
			"**sqlDefault**: Sets a default SQL expression for NULL values in `outColumn`. \n\n" +
			"- Type: `str`, single value\n\n" +
			"- Behaves like `default`, except that it expect spark sql expression format instead of pyspark expression format\n\n" +
			"- Dependencies: `from` and `into` represent the source and destination datasets, `outColumn` must be defined, cannot be used together with `default`\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'description:') {
			const hoverText =
			"**description**: A text block for documenting operations or columns. \n\n" +
			"- Type: `str`, single value\n\n" +
			"- It does not have any technical meaning.\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'outColumnSelection:') {
			const hoverText =
			"**outColumnSelection**: Defines which columns to select from the `from` dataset. \n\n" +
			"- Type: `string` or list of strings\n\n" +
			"- Value can be: `per_metadata`, `all`, `[ field1, field2, field3 ]`\n\n" +
			"- Dependencies: `from` and `into` represent the source and destination datasets\n\n";
			return(this.createHover(hoverText));

		} else if (word === 'union:') {
			const hoverText =
			"**union**: Unions multiple datasets by column names. \n\n" +
			"- Type: list of dataset names\n\n" +
			"- Unions multiple datasets into one, datasets are unionid by column names, not by order.\n\n" +
			"- Dependencies: `into` represent the destination dataset name\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'unionDistinct:') {
			const hoverText =
			"**unionDistinct**: Behaves like `union` but removes duplicate rows. \n\n" +
			"- Type: list of dataset names\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'checkpoint:') {
			const hoverText =
			"**checkpoint**: Creates a dataset checkpoint. \n\n" +
			"- Type: `name`\n\n" +
			"- Creates a dataset checkpoint of given name.\n\n" +
			"- Dependencies: `from`, `into` the dataset to checkpoint, both have to be same name\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'sqlQuery:') {
			const hoverText =
			"**sqlQuery**: Executes a SQL query to build a dataset. \n\n" +
			"- Type: `sql query`\n\n" +
			"- Executes sql query that will be used to build dataset.\n\n" +
			"- Dependencies: `into` represent the destination dataset name\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'sqlDatasetSelector:') {
			const hoverText =
			"**sqlDatasetSelector**: Defines a SQL query for dataset selection based on priority. \n\n" +
			"- Type: `sql query`\n\n" +
			"- Defines sql query of schema: priority - integer, dataset_name - the name of datasets created by `into` command\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'dataQualityCheck:') {
			const hoverText =
			"**dataQualityCheck**: Defines a data quality check. \n\n" +
			"- Type: `dict`\n\n" +
			"- Define data quality check. If the check fails, the pipeline will fail.\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'batch_reader:') {
			const hoverText =
			"**batch_reader**: it defines the source is a batch source and Ara related batch reader will be used to read the data source. \n\n";
			return(this.createHover(hoverText));
		} else if (word === 'stream_reader:') {
			const hoverText =
			"**stream_reader**: it defines the source is a stream source and Ara related stream reader will be used to read the data source. \n\n";
			return(this.createHover(hoverText));
		} else if (word === 'settings:') {
			const hoverText =
			"**settings**: Define the context of data pipeline for running configurations, triggers, etc.. \n\n";
			return(this.createHover(hoverText));
		} else if (word === 'source:') {
			const hoverText =
			"**source**: Define the data sources of data pipeline. A source definitions that will initialize the `SourceComponent`. Each dictionary key has exactly one source definition section. Either of `batch_reader` or `stream_reader` type. Usually the name/key of the dictionary entry denotes the name of the dataset (a spark view in case we talk spark engine) that `SourceComponent` will create.\n\n";
			return(this.createHover(hoverText));
		} else if (word === 'destination:') {
			const hoverText =
			"**destination**: Define the data destinations of data pipeline. A destination defintions that will initialize the `DestinatonComponent`. Each dictionary key has exactly one destination definition, along with `write_mode` that should be performed, and accompanuing transformations (`upsert`, `append`, `overwrite`, `replace`, etc...) \n\n";
			return(this.createHover(hoverText));
		} else if (word === 'transformations:') {
			const hoverText =
			"**transformations**: Define the transformations of data pipeline. A list of transformations to be performed on one or more datasets. In case there is only only `source` defined, the transformations will assume that this is only one dataset, and will use it implicitly \n\n";
			return(this.createHover(hoverText));
		} else if (word === "schema_evolution_rules:") {
			const hoverText =
			"**schema_evolution_rules**: Define the schema evolution rules of data pipeline. This is only valid for delta table. \n\n" +
			"- Type: `list`, optional\n\n" +
			"- Allowed values: \n\n" +
			"  - `allow_new_columns`: add a new column to the schema \n\n" +
			"  - `allow_drop_columns`: drop a column from the schema (not implemented) \n\n" +
			"  - `ignore_missing_columns`: ignore incoming data frame missing columns \n\n" +
			"  - `allow_all_type_changes`: allow all data type changes \n\n" +
			"  - `allow_safe_type_changes`: allow safe data type changes \n\n" +
			"- notes: allow_all_type_changes depends on spark platform schema evolution support. Even you set allow_all_type_changes but most of unsafe type changes are not supported by Databricks directly, it will still fail. \n\n";
			return(this.createHover(hoverText));
		} else if (word === "timezone:") {
			const hoverText =
			"**timezone**: Define the timezone of data pipeline running. \n\n" +
			"- Type: `string`, optional. Please be noted timezone is `disabled` by default. You need to set `timezone_enabled` to `true` to activate it. \n\n" +
			"- Sample values: \n\n" +
			"  - `UTC` \n\n" +
			"  - `America/New_York` \n\n" +
			"  - `Asia/Shanghai` \n\n" +
			"  - `Europe/London` \n\n" +
			"  - `Europe/Warsaw` \n\n" +
			"  - `Europe/Amsterdam` \n\n";
			return(this.createHover(hoverText));
		} else if (word === "timezone_enabled:") {
			const hoverText =
			"**timezone_enabled**: Define whether the timezone is enabled or not. \n\n" +
			"- Type: `boolean`, optional\n\n" +
			"- Default value: `false`\n\n" +
			"- Allowed values: \n\n" +
			"  - `true`: enabled\n\n" +
			"  - `false`: disabled\n\n";
			return(this.createHover(hoverText));
		} else if (word === "spark_conf:") {
			const hoverText =
			"**spark_conf**: Define the spark configurations on the job / ui cluster to run the data pipeline. You can use !load_yaml to load the configurations stored in a yaml file. \n\n" +
			"- Type: `struct`, required\n\n" +
			"- Structure Example: \n\n" +
			"  ```yaml\n\n" +
			"  spark_conf:\n\n" +
			"    spark.databricks.delta.preview.enabled: true\n\n" +
			"    spark.sql.legacy.timeParserPolicy: CORRECTED\n\n" +
			"    spark.databricks.io.cache.enabled: true\n\n" +
			"    spark.sql.adaptive.skewJoin.skewedPartitionThresholdInBytes: 2097152\n\n" +
			"  ```";
			return(this.createHover(hoverText));
		} else if (word === "namespace:") {
			const hoverText =
			"**namespace**: Define the namespace in the job definition. It's the data pipeline path folder with `/` replaced by `.` without `pipeline.` like `raw.avair` \n\n" +
			"- Type: `string`, optional\n\n";
			return(this.createHover(hoverText));
		} else if (word === "auto_loader:") {
			const hoverText =
			"**auto_loader**: Define the auto loader configurations of data pipeline. \n\n" +
			"- Type: `struct`, optional\n\n" +
			"- Structure: \n\n" +
			"  - `include_existing_files`: whether to include existing files saved in delta table before when processing the auto loader. \n\n" +
			"  - `queue_name`: define the queue_name. The default queue_name is `job_fqn`-`job_name` \n\n" +
			"  - `schema_evolution_mode` \n\n";
			return(this.createHover(hoverText));
		}



        return undefined; // Return undefined if no hover information is available
    }

	private createHover(hoverText: string): vscode.Hover {
		const hoverContent = new vscode.MarkdownString();
		hoverContent.appendMarkdown(hoverText);
		hoverContent.isTrusted = true;
		return new vscode.Hover(hoverContent);
}
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "ara-yaml-assist" is now active!');

    // Register the completion item provider for YAML files
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        'yaml', // Use 'yaml' if you're targeting all YAML files
        new AraYamlCompletionItemProvider(), 
        ' ' // Trigger on space
    );
	const hoverProvider = vscode.languages.registerHoverProvider('yaml', new YamlHoverProvider());
    context.subscriptions.push(completionProvider);
	context.subscriptions.push(hoverProvider);

}


// This method is called when your extension is deactivated
export function deactivate() {}
