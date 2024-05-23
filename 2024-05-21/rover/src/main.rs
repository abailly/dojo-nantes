fn main() {
    println!("Hello, world!");
}

#[derive(PartialEq)]
enum Command {
    Forward,
    RotateLeft,
}

type Rover = (u8, u8);

const initial_rover: Rover = (0, 0);

fn send_command(rover: Rover, command: &Command) -> Rover {
    match command {
        Command::Forward => (rover.0, rover.1 + 1),
        Command::RotateLeft => rover,
    }
}

fn send_commands(rover: Rover, commands: Vec<Command>) -> Rover {
    commands.iter().fold(rover, send_command)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::Command::*;

    #[test]
    fn does_not_move_given_no_commands() {
        let rover = initial_rover;
        let result = send_commands(rover, vec![]);
        assert_eq!(result, initial_rover);
    }

    #[test]
    fn does_move_forward_north_given_one_forward_command() {
        let rover = initial_rover;
        let result = send_commands(rover, vec![Forward]);
        assert_eq!(result, (0, 1));
    }

    #[test]
    fn does_move_forward_north_given_two_forward_commands() {
        let rover = initial_rover;
        let result = send_commands(rover, vec![Forward, Forward]);
        assert_eq!(result, (0, 2));
    }

    #[test]
    fn change_orientation_of_rover_given_it_rotates_left() {
        let rover = initial_rover;
        let result = send_command(rover, &RotateLeft);
        assert_eq!(result, (0, 0));
    }
}
