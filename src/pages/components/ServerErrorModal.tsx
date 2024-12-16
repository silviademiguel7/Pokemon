import { Box, Modal, Typography } from "@mui/material";

interface ServerErrorModalProps {
	open: boolean;
	onClose: () => void;
}

export const ServerErrorModal = ({ open, onClose }: ServerErrorModalProps) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 400,
					bgcolor: "background.paper",
					boxShadow: 24,
					p: 4,
				}}
			>
				<Typography
					id='modal-modal-title'
					variant='h6'
					component='h2'
				>
					Se ha producido un error
				</Typography>
				<Typography
					id='modal-modal-description'
					sx={{ mt: 2 }}
				>
					Por favor, inténtelo de nuevo más tarde.
				</Typography>
			</Box>
		</Modal>
	);
};
