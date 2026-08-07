export default {
	compilerOptions: {
		warningFilter: (warning) => {
			if (warning.code === 'state_referenced_locally') {
				return false;
			}

			return true;
		},
	},
};
