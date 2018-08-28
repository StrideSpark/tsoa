import * as ts from 'typescript';
import * as YAML from 'yamljs';
import { SwaggerConfig } from '../config';
import { MetadataGenerator } from '../metadataGeneration/metadataGenerator';
import { Tsoa } from '../metadataGeneration/tsoa';
import { SpecGenerator3 } from '../swagger/specGenerator3';
import { Swagger } from '../swagger/swagger';
import { fsExists, fsMkDir, fsWriteFile } from '../utils/fs';

export const generateSwaggerSpec = async (
    config: SwaggerConfig,
    compilerOptions?: ts.CompilerOptions,
    ignorePaths?: string[],
    /**
     * pass in cached metadata returned in a previous step to speed things up
     */
    metadata?: Tsoa.Metadata
) => {
    if (!metadata) {
        metadata = new MetadataGenerator(config.entryFile, compilerOptions, ignorePaths).Generate();
    }
    let spec: Swagger.Spec;

    // if (args.yaml) {
    //     config.swagger.yaml = args.yaml;
    //   }
    //   if (args.json) {
    //     config.swagger.yaml = false;
    //   }

    //   const compilerOptions = validateCompilerOptions(config.compilerOptions);
    //   const swaggerConfig = validateSwaggerConfig(config.swagger);
    //   const metadata = new MetadataGenerator(swaggerConfig.entryFile, compilerOptions, config.ignore).Generate();
    //   let spec: Swagger.Spec;
    //   if (config.swagger.version && config.swagger.version.split('.')[0] === '3') {
    //     spec = new SpecGenerator3(metadata, config.swagger).GetSpec();
    //   } else {
    //     spec = new SpecGenerator2(metadata, config.swagger).GetSpec();
    //   }

    //   const exists = fs.existsSync(swaggerConfig.outputDirectory);
    //   if (!exists) {
    //     fs.mkdirSync(swaggerConfig.outputDirectory);
    //   }
    //   let data = JSON.stringify(spec, null, '\t');
    //   if (config.swagger.yaml) {
    //     data = YAML.stringify(JSON.parse(data), 10);
    //   }
    //   const ext = config.swagger.yaml ? 'yaml' : 'json';

    //   fs.writeFileSync(`${swaggerConfig.outputDirectory}/swagger.${ext}`, data, { encoding: 'utf8' });
    // } catch (err) {
    //   // tslint:disable-next-line:no-console
    //   console.error('Generate swagger error.\n', err);
    //   process.exit(1);
    // }

    // if (config.swagger.version && config.swagger.version.split('.')[0] === '3') {
    spec = new SpecGenerator3(metadata, config).GetSpec();
    // } else {
    // spec = new SpecGenerator2(metadata, config.swagger).GetSpec();
    // }
    // const spec = new SpecGenerator(metadata, config).GetSpec();

    const exists = await fsExists(config.outputDirectory);
    if (!exists) {
        await fsMkDir(config.outputDirectory);
    }

    let data = JSON.stringify(spec, null, '\t');
    if (config.yaml) {
        data = YAML.stringify(JSON.parse(data), 10);
    }
    const ext = config.yaml ? 'yaml' : 'json';

    await fsWriteFile(`${config.outputDirectory}/swagger.${ext}`, data, { encoding: 'utf8' });

    return metadata;
};
