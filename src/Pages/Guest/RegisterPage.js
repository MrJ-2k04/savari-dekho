import { Box } from "@mui/material";
import RegistrationForm from "Components/Forms/RegistrationForm";
import { ReactComponent as Illustration } from "Assets/SVGs/Booking.svg";
import MinimalLayout from "Layout/Minimal";
import { MHidden } from "Components/@Material-Extend";

function RegisterPage() {
    return (
        <MinimalLayout>
            <Box display={'flex'} alignItems={'center'}>
                <MHidden width="mdDown">
                    <Box width={{ xs: '100%', sm: '600px', md: '750px', lg: '100%' }} maxWidth={'1100px'} mx={'auto'}>
                        <Illustration width={'100%'} />
                    </Box>
                </MHidden>
                <RegistrationForm />
            </Box>
        </MinimalLayout>
    );
}

export default RegisterPage;