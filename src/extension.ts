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

					let jobdefItem = new vscode.CompletionItem("job_def:", vscode.CompletionItemKind.Property);
					jobdefItem.documentation = new vscode.MarkdownString("Define the job definition for your data pipeline including `namespace` and `name`.");
					suggestions.push(jobdefItem);

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
					suggestions.push(new vscode.CompletionItem("primary_key:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("scope_key:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("event_order:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("partition_columns:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("event_action:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("pk_violations_handling_action:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("uppercase_pk_columns:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("schema_evolution_rules:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("increment_detection_mode:", vscode.CompletionItemKind.Property));
					suggestions.push(new vscode.CompletionItem("safe_schema_merge:", vscode.CompletionItemKind.Property));

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
					scdCompWithTargetItem.documentation = new vscode.MarkdownString("Define the excluded comparison columns between incoming dataframe and target delta table.");
					suggestions.push(scdCompWithTargetItem);
					let scdCompDedupeItem = new vscode.CompletionItem("scd_excluded_dedup_comparison_cols:", vscode.CompletionItemKind.Property);
					scdCompDedupeItem.documentation = new vscode.MarkdownString("Define the excluded comparison columns among the incoming dataframe.");
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
					suggestions.push(new vscode.CompletionItem("binary_body", vscode.CompletionItemKind.Value));
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
					suggestions.push(new vscode.CompletionItem("allow_new_columns", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("allow_drop_columns ", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("ignore_missing_columns", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("allow_all_type_changes", vscode.CompletionItemKind.Value));
					suggestions.push(new vscode.CompletionItem("allow_safe_type_changes", vscode.CompletionItemKind.Value));
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
					}
				} else if (this.getParentKeyAtLevel(document, position.line, indentLevel - 1) === "job_def") 
				{
					if (linePrefix.trim() === "")
					{
						suggestions.push(new vscode.CompletionItem("namespace:", vscode.CompletionItemKind.Property));
						suggestions.push(new vscode.CompletionItem("name:", vscode.CompletionItemKind.Property));
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
						suggestions.push(new vscode.CompletionItem("preprocess_functions:", vscode.CompletionItemKind.Property));
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
					}
					if (linePrefix.trim().endsWith("engine:")) {
						// Suggestions for 'engine' values
						suggestions.push(new vscode.CompletionItem("spark", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("python", vscode.CompletionItemKind.Value));
						suggestions.push(new vscode.CompletionItem("sql_tracker", vscode.CompletionItemKind.Value));
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
						suggestions.push(new vscode.CompletionItem("preprocess_functions:", vscode.CompletionItemKind.Property));
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
						trackingColumnsItem.documentation = new vscode.MarkdownString("Column names (combination) to be used for incremental loading. Only for SQL Server Streaming.");
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


    private getIndentLevel(lineText: string): number {
        const match = lineText.match(/^(\s*)/);
        return match ? match[1].length / 2 : 0; // Assuming 2 spaces per indent level
    }
	
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
                const keyMatch = lineText.trim().match(/^(-\s*)?(\w+):/);
                if (keyMatch) {
                    return keyMatch[2];
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
