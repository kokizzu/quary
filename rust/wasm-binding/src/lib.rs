#![deny(clippy::expect_used)]
#![deny(clippy::indexing_slicing)]
#![deny(clippy::needless_lifetimes)]
#![deny(clippy::needless_borrow)]
#![deny(clippy::useless_conversion)]
#![deny(clippy::unwrap_used)]
#![deny(unused_imports)]
#![deny(unused_import_braces)]

extern crate core;

pub mod logging;
mod rpc_helpers;
mod rpc_helpers_test;
mod rpc_proto_defined;
mod rpc_proto_defined_functions;
mod rpc_proto_prompt_functions_edit;
mod rpc_proto_prompt_functions_explain;
mod rpc_proto_prompt_functions_generate;
mod rpc_proto_prompt_functions_generate_to_search;
mod rpc_proto_scaffolding;
mod rpc_rust_defined;
mod uint8_reader;
mod utils;
